const id = Math.random().toString(36).substr(2, 9);

class PixelPerfect {
    get storage() {
        return {
            set: (type, value) => {
                let data = JSON.parse(localStorage.getItem('pixelPerfect'));
                data[type] = value;
                localStorage.setItem('pixelPerfect', JSON.stringify(data));
            },
            get: type => JSON.parse(localStorage.getItem('pixelPerfect'))[type],
            init: () => localStorage.setItem('pixelPerfect', '{"image":null,"x":0,"y":0,"opacity":0.3}')
        };
    }
    
    constructor() {
        this.id = Math.random().toString(36).substr(2, 9);
        if (document.getElementById(`ctr-${this.id}`) === null) {
            this.storage.init();
            document.body.insertAdjacentHTML(
                'beforeend',
                `
                    <style type="text/css">
                        #ctr-${this.id} {
                            position: absolute;
                            top: 0;
                            right: 0;
                            z-index: 2147483647;
                            background-color: #202020;
                            box-sizing: border-box;
                            border-radius: 0 0 0 5px;
                        }
                        #ctr-${this.id} * {
                            font: bold 11px/1.5 Helvetica, sans-serif;
                            box-sizing: border-box;
                            color: #AAA;
                        }
                        #ctr-${this.id} summary {
                            list-style-type: none;
                            padding: 5px 10px;
                            background-color: #181818;
                            color: #FFF;
                            font-weight: bold;
                            cursor: pointer;
                        }
                        #ctr-${this.id} summary::-webkit-details-marker {
                            display: none;
                        }
                        #ctr-${this.id} > div {
                            display: grid;
                            gap: 10px;
                            padding: 10px;
                        }
                        #ctr-${this.id} input,
                        #ctr-${this.id} div.input {
                            padding: 5px;
                            border: 1px solid #343434;
                            width: 100%;
                            background-color: #181818;
                            border-radius: 3px;
                            color: #dcdcdc;
                            height: 32px;
                            color: #AAA;
                        }
                        #ctr-${this.id} div.input::before {
                            content: attr(placeholder);
                            font: bold 11px/1.5 Helvetica, sans-serif;
                            box-sizing: border-box;
                            color: #AAA;
                            align-self: center;
                        }
                        #ctr-${this.id} div.input {
                            position: relative;
                            display: flex;
                        }
                        #ctr-${this.id} input[type=file] {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            z-index: 1;
                            opacity: 0;
                        }
                        #ctr-${this.id} input[type=number] {
                            appearance: textfield;
                        }
                        #ctr-${this.id} p {
                            margin: 0;
                            padding: 5px;
                            background-color: #343434;
                            border: 1px solid #434343;
                            border-radius: 3px;
                            color: #AAA;
                        }
                        #img-${this.id} {
                            position: absolute;
                            top: 0;
                            right: 0;
                            z-index: 2147483646;
                            opacity: .3;
                        }
                        #ctr-${this.id} kbd {
                            background-color: #535353;
                            border-radius: 3px;
                            border: 1px solid #434343;
                            display: inline-block;
                            font: normal 10px/1 sans-serif;
                            padding: 1px 3px;
                        }
                        #ctr-${this.id} .range {
                            width: 100%;
                        }
                        
                        #ctr-${this.id} input[type=range] {
                            appearance: none;
                            padding: 0;
                            height: 0;
                            background-color: #343434;
                            outline: none;
                        }
                        
                        #ctr-${this.id} input[type=range]::-moz-range-thumb {
                            background: #AAA;
                            
                            border: 0;
                            borde-radius: 3px;
                        }
                        
                        
                    </style>
                    <details id="ctr-${this.id}">
                        <summary>PixelPerfect</summary>
                        <div>
                            <label style="grid-column: span 2;">IMAGE<div class="input"><input type="file" accept="image/*" /></div></label>
                            <label style="grid-row: 2;">X<input type="number" value="0" name="x" /></label>
                            <label style="grid-row: 2;">Y<input type="number" value="0" name="y" /></label>
                            <label style="grid-column: span 2;">OPACITY (<output>30</output>%)<input type="range" min="0" max="1" step="0.05" value="0.3" /></label>
                            <p style="grid-column: span 2;">
                                Use <kbd>&#9650;</kbd> <kbd>&#9658;</kbd> <kbd>&#9660</kbd> or <kbd>&#9668;</kbd> with or without:<br>
                                &nbsp;&nbsp;- <kbd>Shift</kbd> to adjust X, Y positions.<br>
                                &nbsp;&nbsp;- <kbd>Alt</kbd> for opacity.<br>
                                Use <kbd>F1</kbd> to toggle PixelPerfect.
                            </p>
                        </div>
                    </details>
                    <img id="img-${this.id}" />
                `
            );

            
            this.wrapper = document.querySelector(`#ctr-${this.id}`);
            
            this.controls = {
                file: this.wrapper.querySelector(`input[type=file]`),
                x: this.wrapper.querySelector(`input[name=x]`),
                y: this.wrapper.querySelector(`input[name=y]`),
                opacity: this.wrapper.querySelector(`input[type=range]`),
                output: this.wrapper.querySelector(`output`),
                image: document.querySelector(`#img-${this.id}`)
            };
                  
            const config = JSON.parse(localStorage.getItem('pixelPerfect'));
            if (config.image) {
                this.controls.image.onload = e => {
                    this.controls.opacity.value = config.opacity;
                    this.controls.x.value = config.x;
                    this.controls.y.value = config.y;
                    this.controls.image.style.opacity = this.controls.opacity.valueAsNumber;
                    this.controls.image.style.left = this.controls.x.valueAsNumber;
                    this.controls.image.style.top = this.controls.y.valueAsNumber;
                    this.controls.file.parentElement.setAttribute('placeholder', `${name} (${e.target.width}x${e.target.height})`);
                };
                this.controls.image.src = config.image;
            }
            
            this.controls.file.parentElement.setAttribute('placeholder', 'Choose an image...');
            this.controls.file.addEventListener('change', e => {
                if (e.target.files.length) {
                    const name = e.target.files[0].name;
                    const reader = new FileReader();
                    reader.onload = e => {
                        this.storage.set('image', e.target.result);
                        this.controls.image.onload = e => {
                            this.controls.image.style.opacity = this.controls.opacity.valueAsNumber;
                            this.controls.image.style.left = this.controls.x.valueAsNumber;
                            this.controls.image.style.top = this.controls.y.valueAsNumber;
                            this.controls.file.parentElement.setAttribute('placeholder', `${name} (${e.target.width}x${e.target.height})`);
                            this.storage.set('x', this.controls.x.valueAsNumber);
                            this.storage.set('y', this.controls.y.valueAsNumber);
                            this.storage.set('opacity', this.controls.opacity.valueAsNumber);
                        };
                        this.controls.image.src = e.target.result;
                    }
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
            
            this.controls.opacity.addEventListener('input', e => {
                this.controls.output.textContent = parseInt(e.target.valueAsNumber * 1e2);
                this.controls.image.style.opacity = e.target.valueAsNumber;
                this.storage.set('opacity', e.target.valueAsNumber);
            });            
            this.controls.x.addEventListener('input', e => {
                this.controls.image.style.left = e.target.valueAsNumber + 'px';
                this.storage.set('x', e.target.valueAsNumber);
            });            
            this.controls.y.addEventListener('input', e => {
                this.controls.image.style.top = e.target.valueAsNumber + 'px';
                this.storage.set('y', e.target.valueAsNumber);
            });
            
            document.addEventListener('keydown', e => {
                if (e.key === 'F1') {
                    this.wrapper.hidden = this.wrapper.hidden === false;
                }
                if (this.wrapper.hidden === false && this.wrapper.open) {
                    if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        this.controls.image.style.top = (parseInt(this.controls.image.style.top) || 0) - (e.ctrlKey ?  10 : 1) + 'px';
                        this.storage.set('y', parseInt(this.controls.image.style.top));
                    }
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        this.controls.image.style.top = (parseInt(this.controls.image.style.top) || 0) + (e.ctrlKey ?  10 : 1) + 'px';
                        this.storage.set('y', parseInt(this.controls.image.style.top));
                    }
                    if (e.key === 'ArrowLeft') {
                        e.preventDefault();
                        this.controls.image.style.left = (parseInt(this.controls.image.style.left) || 0) - (e.ctrlKey ?  10 : 1) + 'px';
                        this.storage.set('x', parseInt(this.controls.image.style.left));
                    }
                    if (e.key === 'ArrowRight') {
                        e.preventDefault();
                        this.controls.image.style.left = (parseInt(this.controls.image.style.left) || 0) + (e.ctrlKey ?  10 : 1) + 'px';
                        this.storage.set('x', parseInt(this.controls.image.style.left));
                    }
                }
            });
        }
    }
}

window.pixelPerfect = new PixelPerfect();
