const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = 1024
canvas.height = 576

const collisionsMap = []

for (let i = 0; i < collisions.length; i += 70) {
    collisionsMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'rgba(255,0,0,0.0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -735,
    y: -700
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
        }
    })
})


const image = new Image()
image.src = './img/Pellet Town.png'

const playerImage = new Image()
playerImage.src = './img/playerDown.png'

class Sprite {
    constructor({ position, velocity, image, frames = { max: 1 } }) {
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width)
            console.log(this.height)
        }

    }

    draw() {
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height,
        )
    }
}

const player = new Sprite({
    position: {
        x: canvas.width / 2 - (192 / 4) / 2,
        y: canvas.height / 2 - 68 / 2,
    },
    image: playerImage,
    frames: {
        max: 4
    }
})


const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const keys = {
    left: { pressed: false },
    right: { pressed: false },
    up: { pressed: false },
    down: { pressed: false },
}

let lastKey


const movables = [background, ...boundaries]
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate() {
    requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()

    let moving = true

    if (keys.up.pressed && lastKey === 'up') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2:
                    {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3,
                        }
                    }
                })) {
                console.log('collidding')
                moving = false
                break
            }
        }
        if (moving) movables.forEach(movable => { movable.position.y += 3 })
    }
    else if (keys.down.pressed && lastKey === 'down') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2:
                    {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3,
                        }
                    }
                })) {
                console.log('collidding')
                moving = false
                break
            }
        }
        if (moving) movables.forEach(movable => { movable.position.y -= 3 })
    }
    else if (keys.left.pressed && lastKey === 'left') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2:
                    {
                        ...boundary, position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y,
                        }
                    }
                })) {
                console.log('collidding')
                moving = false
                break
            }
        }
        if (moving) movables.forEach(movable => { movable.position.x += 3 })
    }
    else if (keys.right.pressed && lastKey === 'right') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2:
                    {
                        ...boundary, position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y,
                        }
                    }
                })) {
                console.log('collidding')
                moving = false
                break
            }
        }
        if (moving) movables.forEach(movable => { movable.position.x -= 3 })
    }
}

animate()

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowUp':
            keys.up.pressed = true
            lastKey = 'up'
            break
        case 'ArrowDown':
            keys.down.pressed = true
            lastKey = 'down'
            break
        case 'ArrowLeft':
            keys.left.pressed = true
            lastKey = 'left'
            break
        case 'ArrowRight':
            keys.right.pressed = true
            lastKey = 'right'
            break
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'ArrowUp':
            keys.up.pressed = false
            break
        case 'ArrowDown':
            keys.down.pressed = false
            break
        case 'ArrowLeft':
            keys.left.pressed = false
            break
        case 'ArrowRight':
            keys.right.pressed = false
            break
    }
})

