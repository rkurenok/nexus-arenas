document.querySelector('input[type="submit"]').addEventListener('click', e => {
    e.preventDefault();
    const characters = [];
    document.querySelectorAll('input').forEach(el => {
        if (el.getAttribute('type') != 'submit') {
            characters.push(el.value);
        }
    })

    let halfwayThrough = Math.floor(characters.length / 2)
    let arrayFirstHalf = characters.slice(0, halfwayThrough);
    let arraySecondHalf = characters.slice(halfwayThrough, characters.length);

    document.querySelector(`.battle-log`).querySelectorAll('ol').forEach(el => {
        el && el.remove();
    });
    document.querySelector('div.result') && document.querySelector('div.result').remove();

    let gladiator1 = new Gladiator(...arrayFirstHalf);
    let gladiator2 = new Gladiator(...arraySecondHalf);
    console.log(gladiator1);
    console.log(gladiator2);

    battle(gladiator1, gladiator2);
})

class Gladiator {
    textLog = "";

    constructor(name, hp, damage, crit, prot, regen, speed) {
        this.name = name;
        this.maxHP = this.hp = +hp;
        this.damage = +damage;
        this.crit = +crit;
        this.prot = +prot;
        this.regen = +regen;
        this.speed = +speed;
        this.armPercentMT = Number(((1 - 1 / (prot / 500 + 1)) * 100).toFixed(2));
        this.regenHPperSec = Number((hp / 10 / 60 * this.regen / 100).toFixed(2));

        const tag = document.createElement('ol');
        tag.setAttribute('id', this.name);
        document.querySelector(`.battle-log`).append(tag);
    }

    hit(armor) {
        let critText = this.textLog = "";
        this.hp = this.hp + this.regenHPperSec > this.maxHP ? this.maxHP : this.hp + this.regenHPperSec;
        let dmgDone = ((Number(Math.random().toFixed(2)) + 0.01) * this.damage * (1 - armor / 100)).toFixed(2);

        if ((Math.random() * 100).toFixed(1) <= this.crit) {
            dmgDone *= 2;
            critText = " кританул и";
        }

        const result = this.textLog = `${this.name}${critText} нанес ${dmgDone} урона`;
        const logBattle = document.querySelector(`.battle-log > ol#${this.name}`);
        this.log(result, logBattle, critText ? ['attack', 'crit'] : ['attack']);
        console.log(result);

        return dmgDone;
    }

    log(text, tag, classNames) {
        let li = document.createElement('li');
        li.classList.add(...classNames);
        li.innerHTML = text;
        if (tag.querySelectorAll('li').length == (tag.nextSibling && tag.nextSibling.querySelectorAll('li').length - 1 || tag.previousSibling && tag.previousSibling.querySelectorAll('li').length - 1)) {
            const logHeight = tag.nextSibling ? tag.nextSibling.querySelector('li:last-child').offsetHeight : tag.previousSibling.querySelector('li:last-child').offsetHeight;
            console.log(logHeight);
            li.style.cssText = `min-height: ${logHeight}px`;
        }
        tag.append(li);
        scrollPage();
    }

    getCurrentHP() {
        this.textLog = "";
        const hpColor = this.hp < 33.3 ? 'red' : this.hp < 66.6 ? 'yellow' : 'green';
        const result = this.textLog = `${this.name} <span class="${hpColor}">${this.maxHP}/${this.hp}</span>`;
        const logBattle = document.querySelector(`.battle-log > ol#${this.name}`);
        this.log(result, logBattle, ['current-hp']);
    }

    static getWinner(name) {
        const div = document.createElement('div');
        div.classList.add('result');
        div.innerText = name ? `Победил ${name}` : "Ничья";
        document.querySelector(`main`).append(div);
        scrollPage();
    }
}

function battle(gladiator1, gladiator2) {
    let b = setInterval(() => {
        gladiator2.hp = +(gladiator2.hp - gladiator1.hit(gladiator2.armPercentMT)).toFixed(2);
        console.log(gladiator2.hp);
        gladiator2.getCurrentHP();
        if (gladiator1.hp < 0 || gladiator2.hp < 0) {
            Gladiator.getWinner(gladiator1.hp < 0 && gladiator2.hp < 0 ? "" : gladiator1.hp < 0 ? gladiator2.name : gladiator1.name);
            clearInterval(a);
            clearInterval(b);
        }
    }, gladiator1.speed * 10);

    let a = setInterval(() => {
        gladiator1.hp = +(gladiator1.hp - gladiator2.hit(gladiator1.armPercentMT)).toFixed(2);
        console.log(gladiator1.hp);
        gladiator1.getCurrentHP();
        if (gladiator1.hp < 0 || gladiator2.hp < 0) {
            Gladiator.getWinner(gladiator1.hp < 0 && gladiator2.hp < 0 ? "" : gladiator1.hp < 0 ? gladiator2.name : gladiator1.name);
            clearInterval(a);
            clearInterval(b);
        }
    }, gladiator2.speed * 10);
}

function scrollPage() {
    window.scrollTo(0, document.body.scrollHeight);
}