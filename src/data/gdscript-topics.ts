export interface CodeSnippet {
  title: string;
  description: string;
  code: string;
  tags: string[];
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  snippets: CodeSnippet[];
}

export const topics: Topic[] = [
  {
    id: "basics",
    title: "Основы",
    icon: "📝",
    description: "Переменные, типы данных и базовый синтаксис GDScript",
    snippets: [
      {
        title: "Переменные и типы данных",
        description: "Объявление переменных с типизацией в GDScript",
        code: "# Статическая типизация\nvar health: int = 100\nvar player_name: String = \"Hero\"\nvar speed: float = 250.0\nvar is_alive: bool = true\nvar position: Vector2 = Vector2.ZERO\nvar inventory: Array[String] = []\n\n# Динамическая типизация (без указания типа)\nvar score = 0\nvar target = null\n\n# Константы\nconst MAX_HEALTH: int = 100\nconst GRAVITY: float = 980.0\n\n# Экспортируемые переменные (настраиваются в редакторе)\n@export var damage: int = 10\n@export var texture: Texture2D\n@export var speed_multiplier: float = 1.5",
        tags: ["переменные", "типы", "экспорт"],
      },
      {
        title: "Условные операторы",
        description: "if/elif/else и match (switch)",
        code: "# Условные операторы\nfunc check_health():\n    if health <= 0:\n        die()\n    elif health < 30:\n        play_low_health_sound()\n    else:\n        print(\"HP: \", health)\n\n# Тернарный оператор\nvar status = \"alive\" if health > 0 else \"dead\"\n\n# Match (аналог switch)\nfunc handle_input(action: String):\n    match action:\n        \"move_left\":\n            move(Vector2.LEFT)\n        \"move_right\":\n            move(Vector2.RIGHT)\n        \"jump\":\n            jump()\n        \"attack\":\n            attack()\n        _:\n            print(\"Неизвестное действие\")",
        tags: ["if", "match", "условия"],
      },
      {
        title: "Циклы",
        description: "for, while и итерация по коллекциям",
        code: "# Цикл for\nfor i in range(10):\n    print(i)  # 0, 1, 2, ..., 9\n\nfor i in range(5, 15):\n    print(i)  # 5, 6, ..., 14\n\nfor i in range(0, 10, 2):\n    print(i)  # 0, 2, 4, 6, 8\n\n# Итерация по массиву\nvar enemies = [\"goblin\", \"orc\", \"dragon\"]\nfor enemy in enemies:\n    print(\"Враг: \", enemy)\n\n# Итерация по словарю\nvar stats = {\"hp\": 100, \"mp\": 50, \"str\": 15}\nfor key in stats:\n    print(key, \": \", stats[key])\n\n# Цикл while\nvar count = 0\nwhile count < 5:\n    print(count)\n    count += 1",
        tags: ["for", "while", "циклы", "range"],
      },
    ],
  },
  {
    id: "functions",
    title: "Функции",
    icon: "⚡",
    description: "Объявление функций, аргументы, возврат значений",
    snippets: [
      {
        title: "Объявление функций",
        description: "Функции с типизацией аргументов и возвращаемого значения",
        code: "# Простая функция\nfunc greet():\n    print(\"Привет, мир!\")\n\n# Функция с аргументами и возвращаемым значением\nfunc add(a: int, b: int) -> int:\n    return a + b\n\n# Аргументы со значениями по умолчанию\nfunc take_damage(amount: int = 10, source: String = \"unknown\") -> void:\n    health -= amount\n    print(\"Урон \", amount, \" от \", source)\n    if health <= 0:\n        die()\n\n# Статическая функция (без привязки к экземпляру)\nstatic func calculate_distance(a: Vector2, b: Vector2) -> float:\n    return a.distance_to(b)\n\n# Lambda-функции (Godot 4.x)\nvar on_hit = func(damage: int):\n    health -= damage\n    update_health_bar()\n\n# Вызов функции по имени (рефлексия)\ncall(\"take_damage\", 25)\ncallv(\"take_damage\", [25])",
        tags: ["функции", "аргументы", "lambda", "static"],
      },
      {
        title: "Виртуальные методы (обратные вызовы)",
        description: "Встроенные методы жизненного цикла узла",
        code: "# Вызывается при добавлении узла в дерево сцены\nfunc _ready():\n    print(\"Узел готов!\")\n    initialize_player()\n\n# Вызывается каждый кадр (60 раз/сек при 60 FPS)\n# delta — время в секундах с прошлого кадра\nfunc _process(delta: float):\n    position.x += speed * delta\n\n# Вызывается каждый физический кадр\n# Используется для физики (движение, столкновения)\nfunc _physics_process(delta: float):\n    velocity.y += GRAVITY * delta\n    move_and_slide()\n\n# Вызывается при вводе (Godot 4.x)\nfunc _unhandled_input(event: InputEvent):\n    if event.is_action_pressed(\"jump\"):\n        jump()\n\n# Вызывается при изменении размера окна\nfunc _notification(what: int):\n    if what == NOTIFICATION_RESIZED:\n        update_layout()",
        tags: ["_ready", "_process", "_physics_process", "жизненный цикл"],
      },
    ],
  },
  {
    id: "signals",
    title: "Сигналы",
    icon: "📡",
    description: "Система сигналов — событийная модель Godot",
    snippets: [
      {
        title: "Объявление и использование сигналов",
        description: "Как создавать, испускать и подключаться к сигналам",
        code: "# Объявление сигналов\nsignal health_changed(new_health: int)\nsignal died()\nsignal item_collected(item_name: String, amount: int)\n\n# Испускание сигнала\nfunc take_damage(amount: int):\n    health -= amount\n    health_changed.emit(health)  # Godot 4.x синтаксис\n    \n    if health <= 0:\n        died.emit()\n\n# Подключение к сигналу (в коде)\nfunc _ready():\n    # Подключение к сигналу другого узла\n    player.health_changed.connect(_on_health_changed)\n    player.died.connect(_on_player_died)\n    \n    # Подключение с флагом ONCE (вызовется только 1 раз)\n    boss.defeated.connect(_on_boss_defeated, CONNECT_ONE_SHOT)\n\n# Обработчик сигнала\nfunc _on_health_changed(new_health: int):\n    health_bar.value = new_health\n    if new_health < 30:\n        play_warning_sound()\n\nfunc _on_player_died():\n    show_game_over_screen()\n\n# Отключение от сигнала\nfunc cleanup():\n    player.health_changed.disconnect(_on_health_changed)",
        tags: ["signal", "emit", "connect", "события"],
      },
      {
        title: "Передача данных между узлами",
        description: "Паттерны коммуникации через сигналы",
        code: "# --- player.gd ---\nsignal coin_collected(total: int)\n\nvar coins: int = 0\n\nfunc collect_coin():\n    coins += 1\n    coin_collected.emit(coins)\n\n# --- hud.gd ---\n@onready var coin_label: Label = $CoinLabel\n\nfunc _ready():\n    # Находим игрока и подключаемся к его сигналу\n    var player = get_tree().get_first_node_in_group(\"player\")\n    player.coin_collected.connect(_on_coin_collected)\n\nfunc _on_coin_collected(total: int):\n    coin_label.text = \"Монеты: \" + str(total)\n\n# --- Альтернатива: использование групп ---\n# В player.gd:\nfunc _ready():\n    add_to_group(\"player\")\n\n# В любом другом скрипте:\nfunc notify_all_enemies():\n    for enemy in get_tree().get_nodes_in_group(\"enemies\"):\n        enemy.take_damage(50)",
        tags: ["коммуникация", "группы", "паттерны"],
      },
    ],
  },
  {
    id: "classes",
    title: "Классы и ООП",
    icon: "🏗️",
    description: "Классы, наследование, интерфейсы в GDScript",
    snippets: [
      {
        title: "Классы и наследование",
        description: "Создание классов и наследование",
        code: "# --- entity.gd (базовый класс) ---\nclass_name Entity\nextends Node2D\n\nvar health: int = 100\nvar max_health: int = 100\n\nfunc take_damage(amount: int):\n    health = max(0, health - amount)\n    if health <= 0:\n        on_death()\n\nfunc heal(amount: int):\n    health = min(max_health, health + amount)\n\nfunc on_death():\n    queue_free()\n\n# --- player.gd (наследник) ---\nclass_name Player\nextends Entity\n\nvar speed: float = 200.0\nvar experience: int = 0\n\nfunc _physics_process(delta: float):\n    var direction = Input.get_vector(\"left\", \"right\", \"up\", \"down\")\n    position += direction * speed * delta\n\n# Переопределение метода\nfunc on_death():\n    print(\"Игрок погиб!\")\n    get_tree().reload_current_scene()\n\n# --- enemy.gd ---\nclass_name Enemy\nextends Entity\n\nvar damage: int = 10\nvar target: Node2D\n\nfunc attack():\n    if target and target.has_method(\"take_damage\"):\n        target.take_damage(damage)",
        tags: ["class_name", "extends", "наследование", "ООП"],
      },
      {
        title: "Внутренние классы и перечисления",
        description: "Вложенные классы и enum",
        code: "# Перечисления\nenum State { IDLE, WALKING, RUNNING, JUMPING, FALLING }\nenum Direction { LEFT = -1, RIGHT = 1 }\n\nvar current_state: State = State.IDLE\n\nfunc update_state():\n    match current_state:\n        State.IDLE:\n            play_idle_animation()\n        State.WALKING:\n            play_walk_animation()\n        State.RUNNING:\n            play_run_animation()\n\n# Внутренний класс\nclass InventoryItem:\n    var name: String\n    var quantity: int\n    var weight: float\n    \n    func _init(p_name: String, p_qty: int = 1, p_weight: float = 0.1):\n        name = p_name\n        quantity = p_qty\n        weight = p_weight\n    \n    func get_total_weight() -> float:\n        return weight * quantity\n\n# Использование внутреннего класса\nvar sword = InventoryItem.new(\"Меч\", 1, 2.5)\nvar potions = InventoryItem.new(\"Зелье\", 5, 0.3)",
        tags: ["enum", "inner class", "перечисления"],
      },
    ],
  },
  {
    id: "nodes",
    title: "Узлы и сцены",
    icon: "🌳",
    description: "Работа с деревом узлов, создание и управление сценами",
    snippets: [
      {
        title: "Работа с узлами",
        description: "Поиск, создание и управление узлами",
        code: "# Получение дочерних узлов\n@onready var sprite: Sprite2D = $Sprite2D\n@onready var label: Label = $UI/HealthLabel\nvar button = get_node(\"UI/Button\")\n\n# Поиск узлов\nvar player = get_tree().get_first_node_in_group(\"player\")\nvar enemies = get_tree().get_nodes_in_group(\"enemies\")\n\n# Навигация по дереву\nvar parent = get_parent()\nvar children = get_children()\nvar root = get_tree().root\nvar scene_root = get_tree().current_scene\n\n# Создание узлов из сцены (preloaded)\nvar bullet_scene = preload(\"res://scenes/bullet.tscn\")\n\nfunc shoot():\n    var bullet = bullet_scene.instantiate()\n    bullet.position = muzzle.position\n    bullet.direction = get_global_mouse_position() - global_position\n    get_tree().current_scene.add_child(bullet)\n\n# Удаление узлов\nfunc destroy():\n    queue_free()  # Безопасное удаление (в конце кадра)\n    # remove_child(node)  # Убрать из дерева (не удаляет)",
        tags: ["узлы", "сцены", "дерево", "instantiation"],
      },
      {
        title: "Работа со сценами",
        description: "Загрузка, смена и управление сценами",
        code: "# Переход между сценами\nfunc change_scene(path: String):\n    get_tree().change_scene_to_file(path)\n\n# Предзагрузка сцены (быстрее при использовании)\nvar main_menu = preload(\"res://scenes/main_menu.tscn\")\nvar game_scene = preload(\"res://scenes/game.tscn\")\n\n# Асинхронная загрузка\nfunc load_level_async(path: String):\n    var loader = ResourceLoader.load_threaded_request(path)\n    # Проверяем статус загрузки в _process\n    while ResourceLoader.load_threaded_get_status(path) == ResourceLoader.THREAD_LOAD_IN_PROGRESS:\n        await get_tree().process_frame\n    var scene = ResourceLoader.load_threaded_get(path)\n    get_tree().change_scene_to_packed(scene)\n\n# Пауза игры\nfunc toggle_pause():\n    get_tree().paused = !get_tree().paused\n\n# Установка режима паузы для узла\nfunc _ready():\n    process_mode = Node.PROCESS_MODE_ALWAYS  # Работает даже в паузе",
        tags: ["сцены", "переход", "async", "пауза"],
      },
    ],
  },
  {
    id: "physics",
    title: "Физика и движение",
    icon: "🎮",
    description: "Физическое тело, движение, коллизии",
    snippets: [
      {
        title: "Движение CharacterBody2D",
        description: "Платформер — движение и прыжки",
        code: "extends CharacterBody2D\n\nconst SPEED = 300.0\nconst JUMP_VELOCITY = -450.0\nconst GRAVITY = 980.0\n\nfunc _physics_process(delta: float):\n    # Гравитация\n    if not is_on_floor():\n        velocity.y += GRAVITY * delta\n    \n    # Прыжок\n    if Input.is_action_just_pressed(\"jump\") and is_on_floor():\n        velocity.y = JUMP_VELOCITY\n    \n    # Горизонтальное движение\n    var direction = Input.get_axis(\"move_left\", \"move_right\")\n    if direction:\n        velocity.x = direction * SPEED\n    else:\n        velocity.x = move_toward(velocity.x, 0, SPEED)\n    \n    move_and_slide()\n\n# Проверка столкновений после move_and_slide()\nfunc check_collisions():\n    for i in get_slide_collision_count():\n        var collision = get_slide_collision(i)\n        var collider = collision.get_collider()\n        if collider is Enemy:\n            take_damage(10)",
        tags: ["CharacterBody2D", "платформер", "движение", "коллизии"],
      },
      {
        title: "Top-Down движение",
        description: "Движение в стиле top-down shooter",
        code: "extends CharacterBody2D\n\n@export var speed: float = 200.0\n@export var acceleration: float = 800.0\n@export var friction: float = 1200.0\n\nfunc _physics_process(delta: float):\n    var input_dir = Input.get_vector(\"move_left\", \"move_right\", \"move_up\", \"move_down\")\n    \n    if input_dir != Vector2.ZERO:\n        velocity = velocity.lerp(input_dir * speed, acceleration * delta / speed)\n        # Поворот спрайта в направлении движения\n        rotation = input_dir.angle()\n    else:\n        velocity = velocity.lerp(Vector2.ZERO, friction * delta / speed)\n    \n    move_and_slide()\n\n# Стрельба в направлении мыши\nfunc _unhandled_input(event: InputEvent):\n    if event.is_action_pressed(\"shoot\"):\n        var direction = (get_global_mouse_position() - global_position).normalized()\n        spawn_bullet(direction)\n\nfunc spawn_bullet(dir: Vector2):\n    var bullet = preload(\"res://scenes/bullet.tscn\").instantiate()\n    bullet.global_position = $Muzzle.global_position\n    bullet.direction = dir\n    get_tree().current_scene.add_child(bullet)",
        tags: ["top-down", "CharacterBody2D", "shooter", "движение"],
      },
    ],
  },
  {
    id: "tweens",
    title: "Анимации и Tween",
    icon: "✨",
    description: "Tween-анимации, интерполяция, эффекты",
    snippets: [
      {
        title: "Tween анимации",
        description: "Создание плавных анимаций через код",
        code: "# Создание Tween (Godot 4.x)\nfunc animate_appear():\n    var tween = create_tween()\n    modulate.a = 0.0\n    scale = Vector2(0.5, 0.5)\n    \n    tween.set_parallel(true)  # Анимировать одновременно\n    tween.tween_property(self, \"modulate:a\", 1.0, 0.3)\n    tween.tween_property(self, \"scale\", Vector2.ONE, 0.3)\n\n# Последовательная анимация\nfunc animate_attack():\n    var tween = create_tween()\n    tween.tween_property(self, \"position:x\", position.x + 50, 0.1)\n    tween.tween_property(self, \"position:x\", position.x, 0.2)\n    tween.tween_callback(_on_attack_finished)\n\n# Циклическая анимация (пульсация)\nfunc pulse():\n    var tween = create_tween().set_loops()\n    tween.tween_property(self, \"scale\", Vector2(1.1, 1.1), 0.5)\n    tween.tween_property(self, \"scale\", Vector2.ONE, 0.5)\n\n# Анимация с задержкой\nfunc delayed_action():\n    var tween = create_tween()\n    tween.tween_interval(1.0)  # Ждём 1 секунду\n    tween.tween_callback(explode)",
        tags: ["tween", "анимация", "интерполяция", "easing"],
      },
      {
        title: "await и асинхронность",
        description: "Асинхронные операции и корутины",
        code: "# await — ожидание сигнала\nfunc fade_out():\n    var tween = create_tween()\n    tween.tween_property(self, \"modulate:a\", 0.0, 1.0)\n    await tween.finished  # Ждём завершения анимации\n    queue_free()\n\n# Асинхронная загрузка\nfunc load_and_show():\n    show_loading_screen()\n    await get_tree().create_timer(2.0).timeout\n    hide_loading_screen()\n\n# Корутинный паттерн\nfunc dash():\n    is_dashing = true\n    var original_speed = speed\n    speed *= 3.0\n    \n    await get_tree().create_timer(0.3).timeout\n    \n    speed = original_speed\n    is_dashing = false\n\n# Цикл с await\nfunc spawn_wave():\n    for i in range(5):\n        spawn_enemy()\n        await get_tree().create_timer(1.0).timeout\n    print(\"Волна завершена!\")",
        tags: ["await", "async", "корутины", "timer"],
      },
    ],
  },
  {
    id: "utils",
    title: "Утилиты",
    icon: "🔧",
    description: "Полезные приёмы и утилиты GDScript",
    snippets: [
      {
        title: "Работа с Array и Dictionary",
        description: "Массивы, словари и их методы",
        code: "# --- Array ---\nvar items: Array[String] = [\"sword\", \"shield\", \"potion\"]\nitems.append(\"bow\")           # Добавить в конец\nitems.insert(0, \"helmet\")     # Вставить по индексу\nitems.erase(\"shield\")         # Удалить по значению\nitems.remove_at(2)            # Удалить по индексу\nitems.sort()                  # Сортировка\nitems.shuffle()               # Перемешать\n\n# Фильтрация и поиск (Godot 4.x)\nvar rare_items = items.filter(func(item): return item.length() > 3)\nvar found = items.any(func(item): return item == \"sword\")\nvar doubled = items.map(func(item): return item.to_upper())\n\n# --- Dictionary ---\nvar player_stats = {\n    \"name\": \"Hero\",\n    \"level\": 5,\n    \"stats\": {\"hp\": 100, \"mp\": 50}\n}\n\nplayer_stats[\"gold\"] = 500       # Добавить/обновить\nplayer_stats.erase(\"level\")      # Удалить ключ\nplayer_stats.has(\"name\")         # Проверка наличия\nplayer_stats.keys()              # Все ключи\nplayer_stats.values()            # Все значения\n\n# Merge словарей\nvar defaults = {\"hp\": 100, \"mp\": 50, \"speed\": 10}\nvar custom = {\"hp\": 150, \"speed\": 15}\nvar result = defaults.duplicate()\nresult.merge(custom)  # {\"hp\": 150, \"mp\": 50, \"speed\": 15}",
        tags: ["Array", "Dictionary", "коллекции", "filter", "map"],
      },
      {
        title: "Полезные паттерны",
        description: "Состояние, пул объектов, синглтон",
        code: "# --- State Machine (простой) ---\nvar states = {\n    \"idle\": idle_state,\n    \"walk\": walk_state,\n    \"attack\": attack_state,\n}\nvar current_state: String = \"idle\"\n\nfunc _process(delta):\n    if states.has(current_state):\n        states[current_state].call(delta)\n\nfunc change_state(new_state: String):\n    current_state = new_state\n\nfunc idle_state(delta):\n    if Input.get_axis(\"left\", \"right\") != 0:\n        change_state(\"walk\")\n\n# --- Object Pool ---\nclass BulletPool:\n    var pool: Array[Node2D] = []\n    var scene: PackedScene\n    \n    func _init(p_scene: PackedScene, size: int = 20):\n        scene = p_scene\n        for i in size:\n            var bullet = scene.instantiate()\n            bullet.set_process(false)\n            bullet.visible = false\n            pool.append(bullet)\n    \n    func get_bullet() -> Node2D:\n        for bullet in pool:\n            if not bullet.visible:\n                bullet.visible = true\n                bullet.set_process(true)\n                return bullet\n        return null\n    \n    func return_bullet(bullet: Node2D):\n        bullet.visible = false\n        bullet.set_process(false)\n\n# --- Autoload (Singleton) ---\n# В Project Settings -> Autoload добавляем \"GameManager\"\n# game_manager.gd:\nextends Node\nvar score: int = 0\nvar level: int = 1\nsignal score_changed",
        tags: ["state machine", "pool", "singleton", "autoload"],
      },
    ],
  },
];
