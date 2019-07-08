class Carousel {
    constructor(props) {
        this.element = document.getElementById(props.element);
        this.width = props.width;
        this.imageWrapper = document.querySelector(".image_wrapper");
        this.intervalId = null;
        this.marginLeft = 0;
        this.time_gap = 2000 / 60;
        this.animate();
        this.renderIndicatorControls();
        this.renderArrowControls();
    }
    getCurrentIndex() {
        let indexMargin = parseInt(this.imageWrapper.style.marginLeft);
        if (indexMargin <= 0 && indexMargin > -this.width) {
            return 1;
        }
        if (indexMargin <= -this.width && indexMargin > -2*this.width) {
            return 2;
        }
        if (indexMargin <= -2*this.width && indexMargin > -3*this.width) {
            return 3;
        }
    }   
    animate() {
        this.intervalId = setInterval(function () {
            if (this.marginLeft <= -3*this.width) {
                this.marginLeft = 0;
            }
            this.imageWrapper.style.marginLeft = this.marginLeft + 'px';
            this.marginLeft -= 8;
            let currentMargin = parseInt(this.imageWrapper.style.marginLeft);
            if (currentMargin % this.width == 0) {
                this.holdAnimation();
            }
        }.bind(this), this.time_gap);
    }
    holdAnimation() {
        clearInterval(this.intervalId);
        setTimeout(function () {
            this.animate();
        }.bind(this), 3000);
    }   
    renderArrowControls() {
        const leftArrow = document.createElement('button');
        let leftArrowInterval;
        leftArrow.innerHTML = 'Left';
        leftArrow.classList.add('carousel-arrow-left');
        this.element.appendChild(leftArrow);
        leftArrow.onclick = function () {
            if (this.marginLeft <= -3*this.width) {
                this.marginLeft = 0;
            }
            leftArrowInterval = setInterval(function () {
                this.imageWrapper.style.marginLeft = this.marginLeft + 'px';
                this.marginLeft -= 8;
                let currentMargin = parseInt(this.imageWrapper.style.marginLeft);
                if (currentMargin % this.width == 0) {
                    clearInterval(leftArrowInterval);
                }
            }.bind(this), 2);
        }.bind(this);
        const rightArrow = document.createElement('button');
        let rightArrowInterval;
        rightArrow.innerHTML = 'Right';
        rightArrow.classList.add('carousel-arrow-right');
        this.element.appendChild(rightArrow);
        rightArrow.onclick = function () {
            if (this.marginLeft >= -this.width) {
                this.marginLeft = -3*this.width;
                this.imageWrapper.style.marginLeft = this.marginLeft + 'px';
            }
            let nextPoint = parseInt(this.imageWrapper.style.marginLeft);
            rightArrowInterval = setInterval(function () {
                this.marginLeft = parseInt(this.imageWrapper.style.marginLeft);

                this.imageWrapper.style.marginLeft = (this.marginLeft + 8) + 'px';

                if (nextPoint + this.width == this.marginLeft + 8) {
                    clearInterval(rightArrowInterval);
                }
            }.bind(this), 1);
        }.bind(this)
    }
    slide(i) {
        let indicatorInterval;
        let currentIndex = this.getCurrentIndex();
        let difference = currentIndex - i;
        let distance = difference * this.width;
        if (difference != 0) {
            if (difference > 0) {
                let nextPoint = parseInt(this.imageWrapper.style.marginLeft);
                indicatorInterval = setInterval(function () {
                    this.marginLeft = parseInt(this.imageWrapper.style.marginLeft);

                    this.imageWrapper.style.marginLeft = (this.marginLeft + 8) + 'px';

                    if (nextPoint + distance == this.marginLeft + 8) {
                        clearInterval(indicatorInterval);
                    }
                }.bind(this), 1);
            } else {
                indicatorInterval = setInterval(function () {
                    this.imageWrapper.style.marginLeft = this.marginLeft + 'px';
                    this.marginLeft -= 8;
                    let currentMargin = parseInt(this.imageWrapper.style.marginLeft);
                    if (currentMargin % distance == 0) {
                        clearInterval(indicatorInterval);
                    }
                }.bind(this), 2);
            }
        }
    };
    renderIndicatorControls() {
        const indicatorWrapper = document.createElement('div');
        indicatorWrapper.classList.add('carousel-indicator-wrapper');
        let indicatorInterval;
        const indicator1 = document.createElement('button');
        indicator1.innerHTML = 1;
        indicatorWrapper.appendChild(indicator1);
        indicator1.onclick = function () {
            this.slide(1);
        }.bind(this);
        const indicator2 = document.createElement('button');
        indicator2.innerHTML = 2;
        indicatorWrapper.appendChild(indicator2);
        indicator2.onclick = function () {
            this.slide(2);
        }.bind(this);
        const indicator3 = document.createElement('button');
        indicator3.innerHTML = 3;
        indicatorWrapper.appendChild(indicator3);

        indicator3.onclick = function () {
            this.slide(3);
        }.bind(this);
        this.element.appendChild(indicatorWrapper);
    }
}


