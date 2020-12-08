class PixelPerfect {
    /* https://acoquoin.github.io/pixel-perfect/app.css*/
    constructor() {
        if (document.getElementById('pixel-perfect-addon') === null) {
            document.body.insertAdjacentHTML(
                'beforeend',
                `
                    <link rel="stylesheet" type="text/css" href="https://acoquoin.github.io/pixel-perfect/app.css">
                    <form id="pixel-perfect-addon" onsubmit="return false;">
                        <b title="Use arrow keys with or without:\n- &quot;Ctrl&quot; to adjust X, Y positions.\n- &quot;Shift&quot; for opacity.\nUse &quot;F1&quot; to toggle PixelPerfect.">PixelPerfect</b>
                        <label>Image:<div placeholder="Choose an image..."><input name="file" type="file" accept="image/*" /></div></label>
                        <label>X:<input name="x" type="number" value="0" /></label>
                        <label>Y:<input name="y" type="number" value="0" /></label>
                        <label>Opacity (<output name="output">50</output>%):<input name="opacity" type="range" min="0" max="1" step=".05" value=".5" /></label>
                    </form>
                    <img id="pixel-perfect-addon-img" style="left: 0; opacity: .5; top: 0;" />
                `
            );
            this.form = document.getElementById('pixel-perfect-addon');
            this.image = document.getElementById('pixel-perfect-addon-img');
            
            // update or load config
            //this.config.file && this.update(config.file);
            
            this.form.file.addEventListener('change', () => {
                if (this.form.file.files.length) {
                    const reader = new FileReader();
                    reader.onload = e => this.update('file', {src: e.target.result, file: this.form.file.files[0]});
                    reader.readAsDataURL(this.form.file.files[0]);
                }
            });
            
            this.form.x.addEventListener('input', () => this.update('x'));
            this.form.y.addEventListener('input', () => this.update('y'));
            this.form.opacity.addEventListener('input', () => this.update('opacity'));
            document.addEventListener('keydown', this);
        }
    }
    
    get config() {
        return JSON.parse(localStorage.getItem('pixel-perfect') || '{"file":null,"name":null,"x":0,"y":0,"opacity":.5}');
    }
    
    update(type, data) {
        switch (type) {
            case 'file':
                this.image.onload = e => {
                    // update form values
                    this.form.file.parentElement.setAttribute('placeholder',  `${data.file.name} (${this.image.naturalWidth}x${this.image.naturalHeight})`);
                };
                this.image.src = data.src;
                break;
            case 'opacity':
                if (data) {
                    this.image.style.opacity = parseFloat(this.image.style.opacity) + data;
                }
                //this.form.output.textContent = (data ?? this.form.opacity.valueAsNumber) * 1e2;
                break;
            case 'x':
                this.image.style.left = parseInt(this.image.style.left) + (data || 0) + 'px';
                break;
            case 'y':
                this.image.style.top = parseInt(this.image.style.top) + (data || 0) + 'px';
                break;
            case '':
                break;
        }
    }
    
    handleEvent(e) {
        if (e.key === 'F1') {
            this.image.hidden = this.form.hidden = this.form.hidden === false;
            //this.image.hidden = this.form.hidden;
        } else if (this.form.hidden === false) {
            const keys = ['ArrowRight', 'ArrowDown', 'ArrowUp', 'ArrowLeft'];
            if (keys.includes(e.key)) {
                e.preventDefault();
                const modifier = keys.findIndex(i => i === e.key) > 1 ? -1 : 1;
                if (e.shiftKey) {
                    this.update('opacity', parseFloat(this.form.opacity.step) * modifier);
                } else {
                    this.update(
                        ['ArrowLeft', 'ArrowRight'].includes(e.key) ? 'x' : 'y',
                        modifier * (e.ctrlKey ?  10 : 1)
                    );
                }
            }
        }
    }
}

window.pixelPerfect = window.pixelPerfect ?? new PixelPerfect();