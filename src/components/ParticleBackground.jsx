import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Mouse position
        let mouse = { x: null, y: null };

        window.addEventListener('mousemove', (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.3; // Slower base speed
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 1.5 + 0.5; // Smaller particles
                this.baseColor = 'rgba(14, 165, 233, 0.3)'; // Fainter base color
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around edges instead of bouncing for a flow effect
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                // Mouse interaction - Gentle Nudge
                if (mouse.x != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 200;

                    if (distance < maxDistance) {
                        // Calculate vector pointing away from mouse (repulsion) or towards (attraction)
                        // Let's do a gentle attraction that swirls
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (maxDistance - distance) / maxDistance;

                        // Gentle attraction
                        this.vx += forceDirectionX * force * 0.02;
                        this.vy += forceDirectionY * force * 0.02;

                        // Limit speed to prevent clumping
                        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                        const maxSpeed = 1.5;
                        if (speed > maxSpeed) {
                            this.vx = (this.vx / speed) * maxSpeed;
                            this.vy = (this.vy / speed) * maxSpeed;
                        }
                    }
                }
            }

            draw() {
                ctx.fillStyle = this.baseColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const init = () => {
            particles = [];
            // Reduce density slightly for cleaner look
            const numberOfParticles = (canvas.width * canvas.height) / 20000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect particles - Graph Mode
                // Only connect to nearest neighbors to avoid mess
                let connections = 0;
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120 && connections < 3) { // Limit connections
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(14, 165, 233, ${0.15 * (1 - distance / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        connections++;
                    }
                }

                // Connect to mouse with a "web" effect
                if (mouse.x != null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 180) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 * (1 - distance / 180)})`; // Purple connection to mouse
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', () => { });
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

export default ParticleBackground;
