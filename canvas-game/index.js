const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const scoreEl = document.querySelector('#scoreEl')
const startGameBtn = document.querySelector('#startGameBtn')
const modalEl = document.querySelector('#modalEl')
const bigScoreEl = document.querySelector('#bigScoreEl')

class Player {
    constructor({ position, radius, color }) {
        this.position = position
        this.radius = radius
        this.color = color
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }
}

class Projectile {
    constructor({ position, radius, color, velocity }) {
        this.position = position
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.position.x = this.position.x + this.velocity.x
        this.position.y = this.position.y + this.velocity.y
        this.draw()
    }
}

class Enemy {
    constructor({ position, radius, color, velocity }) {
        this.position = position
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.position.x = this.position.x + this.velocity.x
        this.position.y = this.position.y + this.velocity.y
        this.draw()
    }
}

const friction = 0.99
class Particle {
    constructor({ position, radius, color, velocity }) {
        this.position = position
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1
    }

    draw() {
        c.save()
        c.globalAlpha = this.alpha
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
        c.restore()
    }

    update() {
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.position.x = this.position.x + this.velocity.x
        this.position.y = this.position.y + this.velocity.y
        this.alpha -= 0.01
    }
}

const x = canvas.width / 2
const y = canvas.height / 2

let player = new Player({
    position: {
        x: x,
        y: y
    },
    radius: 10,
    color: 'white'
})


let projectiles = []
let enemies = []
let particles = []

function init() {
    player = new Player({
        position: {
            x: x,
            y: y
        },
        radius: 10,
        color: 'white'
    })


    projectiles = []
    enemies = []
    particles = []
    score = 0
    scoreEl.innerHTML = score
    bigScoreEl.innerHTML = score
}

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4
        let x
        let y

        if (Math.random() < 0.5) {
            x = Math.random() < .5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < .5 ? 0 - radius : canvas.height + radius
        }

        const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x)

        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(new Enemy({
            position: {
                x: x,
                y: y
            },
            radius: radius,
            color: `hsl(${Math.random() * 360}, 50%, 50%)`,
            velocity: velocity


        }))
    }, 1000)
}

let animationId
let score = 0
function animate() {
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    particles.forEach((particle, i) => {
        if (particle.alpha <= 0) {
            setTimeout(() => {
                particles.splice(i, 1)
            }, 0)
        } else particle.update()
    })
    projectiles.forEach((projectile, i) => {
        projectile.update()
        // Remove projectiles from edges of screen
        if (projectile.position.x + projectile.radius < 0 ||
            projectile.position.x - projectile.radius > canvas.width ||
            projectile.position.y + projectile.radius < 0 ||
            projectile.position.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                projectiles.splice(i, 1)
            }, 0)
        }
    })

    enemies.forEach((enemy, i) => {
        enemy.update()

        // End game
        const dist = Math.hypot(player.position.x - enemy.position.x, player.position.y - enemy.position.y)
        if (dist - enemy.radius - player.radius < 1) {
            setTimeout(() => {
                cancelAnimationFrame(animationId)
                modalEl.style.display = 'flex'
                bigScoreEl.innerHTML = score
            }, 0)
        }

        projectiles.forEach((projectile, j) => {
            const dist = Math.hypot(projectile.position.x - enemy.position.x, projectile.position.y - enemy.position.y)
            // When projectile touch enemy
            if (dist - enemy.radius - projectile.radius < 1) {
                // Create explosions
                for (let i = 0; i < enemy.radius * 2; i++) {
                    particles.push(new Particle({
                        position: {
                            x: projectile.position.x,
                            y: projectile.position.y,
                        },
                        radius: Math.random() * 2,
                        color: enemy.color,
                        velocity: {
                            x: (Math.random() - 0.5) * (Math.random() * 6),
                            y: (Math.random() - 0.5) * (Math.random() * 6)
                        }
                    }))
                }


                if (enemy.radius - 10 > 5) {
                    // Increase score
                    score += 100
                    scoreEl.innerHTML = score
                    gsap.to(enemy, { radius: enemy.radius - 10 })
                    setTimeout(() => {
                        projectiles.splice(j, 1)
                    }, 0)
                }
                else {
                    // Remove from scen altogether score
                    score += 250
                    scoreEl.innerHTML = score
                    setTimeout(() => {
                        enemies.splice(i, 1)
                        projectiles.splice(j, 1)
                    }, 0)
                }

            }
        })
    })
}

addEventListener('click', (e) => {
    const angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2)

    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }

    projectiles.push(new Projectile({
        position: {
            x: canvas.width / 2,
            y: canvas.height / 2
        },
        radius: 5,
        color: 'white',
        velocity: velocity
    }))
})

startGameBtn.addEventListener('click', () => {
    init()
    animate()
    spawnEnemies()
    modalEl.style.display = 'none'
})

