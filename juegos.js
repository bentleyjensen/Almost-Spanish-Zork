var prompt=require('prompt');

// Player Items
var Backpack=[];

// Current area the player is in
var current = 'voy al cuarto de frente';

// List of things to complete
var ScavengerList = [
    'una mesa',//kitchen
    'un almuerzo',//kitchen
    'una ventana',//kitchen
    'veo la tele',//front
    'el juego',//front
    'tocar la guitarra',//front
    'una bicicleta',//exterior
    'la pelota',//exterior
    'las botas',//exterior
    'un escritorio',//office
    'la papelera',//office
    'el lápiz',//office
    'los parientes',//hall/corridor
    'me afeita',//bathroom
    'me ducho',//bathroom
    'me cepillo los dientes',//bathroom
    'las pantuflas',//bedroom
    'la camisa',//bedroom
    'la cama',//bedroom
    'estoy miedo'//sótano basement
];
ScavengerList.sort();
// Functions
var area = {
    'voy a la cocina': function () {
        console.log("Estás en la cocina. (Kitchen) ");
        console.log("Tú ves una mesa, un taza de agua, unos almuerzos, una ventana y unos cuchillos.");
        Go();
    },
    'voy al cuarto de frente': function () {
        console.log("Estás en el cuarto de frente. ");
        console.log("Tú ves el tele, un juego de Settlers Of Catan, y una guitarra.");
        Go();
    },
    'voy al exterior': function () {
        console.log("Estás en el exterior.");
        console.log("Tú ves el pasto, una pelota, un paisaje, las botas y una bicicleta.");
        Go();
    },
    'voy al baño': function () {
        console.log("Estás en el baño.");
        console.log("Tú ves una ducha, la crema de afeitar, y la pasta de dientes.");
        Go();
    },
    'voy a mi cuarto': function () {
        console.log("Estás en tu cuarto");
        console.log("Tú ves una camisa, unas pantuflas y una cama.");
        Go();
    },
    'voy al sótano': function () {
        console.log("Tú eres miedo!");
        if(Backpack.indexOf('estoy miedo') < 0){
            Backpack.push('estoy miedo')
        }
        Go();
    },
    'voy al corredor': function () {
        console.log("Estás en el corredor. Tú ves tu parientes! Tú corres a tu cuarto.");
        console.log('Tú ves tus parientes. Estan enojado, escapas!');
        Backpack.push('los parientes');
        check();
        current = cuarto;
        Go();
    }
}

function Welcome() {
    console.log("Tu nombre es Matt. Tú eres estadounidense.");
    console.log("Tú perdiste muchas cosas. ¡Vas a buscarlos!");
    area[current]();
    Go();
}

function Done() {
    console.log('¡Tú ganas el juego! You\'ve won!');
}
function Bad() {
    console.log("¡Yo no sé qué lo es!");
    area[current]();
}
function check(something) {
    // TODO either make this check to see
    // If you've won, or if something is
    // In your pack or not
    // ↓ Un-tested code ↓ //
    /*if (ScavengerList.indexOf(something) >= 0 && Backpack.indexOf(something) < 0){
        console.log('You\'ve collected \'' + item + '\'');
        Backpack.push(something);
        Backpack.sort();
        if (ScavengerList.toString() == Backpack.toString()){
            Done();
        } else {Go();}
    } else if (ScavengerList.indexOf(something) >= 0 && Backpack.indexOf(something) >= 0){
        console.log("You already have that!");
        Go();
    } else {
        Bad();
    }*/
    // ^ Un-tested code ^//
}

var areaItems = function (currentArea){
    // TODO make items only available to
    // The areas they are in
}

function Go (){
    prompt.start();
    prompt.get(['¿Qúe haces ahora?'], function (err, result){
        // Access moves array for function
        var next = result['¿Qúe haces ahora?'];

        //create an array splitting on spaces
        var nextArray = next.split(' ');

        // See if they're trying to move areas
        if (area[next]){
            //Find area and run that function
            area[next]();
            current = next;
        } // Maybe they want to know what's in their backpack
        else if (next == 'mochila'){
            // Print the stuff, might as well just be the stringified json
            console.log('Tú tienes estas cosas en tu mochila: ' + Backpack.join(', '));
            console.log(' ');
            console.log('Tú necesitas estas cosas en tu mochila: ' + ScavengerList.join(', '));
            console.log();
            area[current]();
        }
         else if (nextArray.splice(0,1) == 'collect'){

            var item = nextArray.join(' ');
            // TODO check(item);
            if (ScavengerList.indexOf(item) >= 0 && Backpack.indexOf(item) < 0){
                console.log('You\'ve collected \'' + item + '\'');
                Backpack.push(item);
                Backpack.sort();
                if (ScavengerList.toString() == Backpack.toString()){
                    Done();
                } else {Go();}
            } else if (ScavengerList.indexOf(item) >= 0 && Backpack.indexOf(item) >= 0){
                console.log("You already have that!");
                Go();
            } else {
                Bad();
            }
        }
        else if (ScavengerList.indexOf(next) >= 0 && Backpack.indexOf(next) < 0){
            // TODO separate verbs from nouns in ScavengerList
            console.log('You\'ve collected \'' + next + '\'');
            Backpack.push(next);
            Backpack.sort();
            if (ScavengerList.toString() == Backpack.toString()){
                Done();
            } else {Go();}
        }else if (ScavengerList.indexOf(next) >= 0 && Backpack.indexOf(next) >= 0){
            console.log("You already have that!");
            Go();
        } else {
            Bad();
        }
    });
}

Welcome();
