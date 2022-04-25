const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor({ position, velocity, width, height }) {
        this.position = position
        this.velocity = velocity
        this.width = 30
        this.height = 30
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (player.position.y + player.height + player.velocity.y < canvas.height) {
            this.velocity.y += gravity
        } else {
            this.velocity.y = 0
        }
    }
}

class Platform {
    constructor({ position }) {
        this.position = position
        this.width = 200
        this.height = 20
    }

    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const gravity = 0.5
const player = new Player({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})


const platforms = [
    new Platform({
        position: {
            x: 200,
            y: 100
        }
    }),
    new Platform({
        position: {
            x: 600,
            y: 100
        }
    })
]

const keys = {
    right: { pressed: false },
    left: { pressed: false }
}

let scrollOffset = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = 5
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
            })
        } else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach(platform => {
                platform.position.x += 5
            })
        }
    }

    // Platform collision detection
    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })

    if(scrollOffset > 2000) {
        console.log('You win')
    }
}

animate()

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowLeft':
            keys.left.pressed = true
            break
        case 'ArrowUp':
            player.velocity.y -= 20
            break
        case 'ArrowRight':
            keys.right.pressed = true
            break

    }
})


addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'ArrowLeft':
            keys.left.pressed = false
            break
        case 'ArrowUp':
            break
        case 'ArrowRight':
            keys.right.pressed = false
            break
    }
})