window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;
    ctx.fillStyle = 'white';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';

    //POO

    class Obstacle{
        contructor(game){
            this.game = game;
            this.collisionX = Math.random() * this.game.width;
            this.collisionY = Math.random() * this.game.height;
            this.collisionRadius = 60; 
        }
    }

    class Player{
        constructor(game){
            this.game = game;
            this.collisionX=this.game.width * 0.5;
            this.collisionY= this.game.height * 0.5;
            this.collisionRadius = 50;
            this.speedX = 0;
            this.speedY = 0;
            this.dx=0;
            this.dy=0;
            this.speedModifier = 50 ;
        }


        draw(context){
            context.beginPath();
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            context.save();
            //global alpha le da la transaparencia a lo que estemos dibujando
            context.globalAlpha = 0.3;
            context.fill();
            context.restore();
            context.stroke();
            //move player
            context.beginPath();
            context.moveTo(this.collisionX, this.collisionY);
            context.lineTo(this.game.mouse.x, this.game.mouse.y);
            context.stroke();

            }

        //moving player
        update(){
            this.dx = this.game.mouse.x - this.collisionX;
            this.dy = this.game.mouse.y -  this.collisionY;
            const distance = Math.hypot(this.dx, this.dy);
            if(distance>this.speedModifier){
            this.speedX = this.dx/distance || 0;
            this.speedY = this.dy/distance || 0;
        } else{
            this.speedX = 0;
            this.speedY =0;
        }
            this.collisionX += this.speedX * this.speedModifier;
            this.collisionY += this.speedY * this.speedModifier ;
        }

        
    }

    //in this class we manipulate all game logic
    class Game{
        constructor(canvas){
            this.canvas=canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.player = new Player(this);
            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed:false
            }
            //Mouse. Vamos a usar event listeners
            canvas.addEventListener('mousedown', (e)=>{
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed=true;
            });

            canvas.addEventListener('mouseup', (e)=>{
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed=false;
            });

            canvas.addEventListener('mousemove', (e)=>{
                if(this.mouse.pressed){
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;}
            });
        }
        render(context){
            this.player.draw(context);
            this.player.update();
        }
    }

    const game = new Game(canvas);
    
    function animate(){
        //clean screen
        //ctx.imageSmoothingEnabled = true;
        ctx.clearRect(0,0,canvas.width, canvas.height)
        game.render(ctx);
        requestAnimationFrame(animate);
    }

    animate();

})