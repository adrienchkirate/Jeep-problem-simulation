// Tableau qui contient tous les points
var arrayPoint   = ['Réserve', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// On crée un tableau d'objet contenant les informations sur les points
for (var i = 0; i < arrayPoint.length; i++)
{
    if(arrayPoint[i] == 'Réserve') {
        arrayPoint[i] = {
            name: arrayPoint[i],
            bidon: parseInt($('.reserve').val()) // Pour le point réserve on lui attribue le nombre de bidon rentré par l'utilisateur
        };
    }
    else
    {
        arrayPoint[i] = {
            name: arrayPoint[i],
            bidon: 0
        };
    }
}

// Fonction qui permet de raffraichir la position de la jeep sur le visuel et le nombre de bidon de chaque point
function refreshLine()
{
    var distance = parseInt($('.distance').text());


    $('.ligne').empty();
    $('.ligne').append('<p style="float: right">Bidon au point</p> <p>Point</p>')

    for(var i=0; i < arrayPoint.length; i++)
    {
        // On repére le point où la jeep se trouve et on affiche une pastille pour en informer l'utilisateur
        if(arrayPoint[i].name == arrayPoint[distance].name)
        {
            $('.ligne').append('<span class="label label-info" style="float: right">' + arrayPoint[i].bidon + '</span> <span class="label label-default">' + arrayPoint[i].name + '</span>  <span class="label label-danger">Vous êtes ici</span> <br />');
        }
        else
        {
            $('.ligne').append('<span class="label label-info" style="float: right">' + arrayPoint[i].bidon + '</span> <span class="label label-default">' + arrayPoint[i].name + '</span> <br />');
        }
    }
}

// Fonction qui permet de réinitialiser l'application
function resetPoint()
{
    for (var i = 0; i < arrayPoint.length; i++)
    {
        if(arrayPoint[i].name == 'Réserve') {
            arrayPoint[i] = {
                name: arrayPoint[i].name,
                bidon: parseInt($('.reserve').val()) // Pour le point réserve on lui attribue le nombre de bidon rentré par l'utilisateur
            };
        }
        else
        {
            arrayPoint[i] = {
                name: arrayPoint[i].name,
                bidon: 0
            };
        }
    }
}

// Fonction qui permet de lancer l'observation par la console d'un nouveau voyage
function newLog()
{

    var voyage = parseInt($('.numberConsole').last().text()) + 1;

    $('.blocLog').append('<span class="label label-warning"><span class="numberConsole">' + voyage + '</span>eme Voyage : </span> <br /><br />');
    $('.blocLog').append('<div class="log"></div>');
}

// On l'utilise une première fois pour avoir l'affichage de base
refreshLine();

// Evenement correspondant à avancer
$(document).on('click', '.forward', function() {

    var distance = parseInt($('.distance').text()), reservoir = $('.reservoir').text();

    if(reservoir != 'Vide') // ne fonction que si le réservoir n'est pas vide
    {
        $('.currentBidon').text(arrayPoint[distance + 1].bidon); // On affiche les caractéristiques du point d'après
        $('.currentPoint').text(arrayPoint[distance + 1].name);
        $('.reservoir').text('Vide');
        $('.distance').text(distance + 1); // On rajoute une unité de distance

        $('.log:last-of-type').append('<p> - Point ' + arrayPoint[distance].name + ' vers ' + arrayPoint[distance + 1].name + '</p>');
    }

    refreshLine(); // On actualise la position visuel de la jeep
});

// Evenement correspondant à reculer
$(document).on('click', '.backward', function() {

    var distance = parseInt($('.distance').text()), reservoir = $('.reservoir').text();

    if(reservoir != 'Vide' && arrayPoint[distance].name != 'Réserve') // Même condition que .forward + si on est pas déjà à la réserve
    {
        $('.currentBidon').text(arrayPoint[distance - 1].bidon); // On affiche les caractéristiques du point d'avant
        $('.reservoir').text('Vide');
        $('.currentPoint').text(arrayPoint[distance - 1].name);
        $('.distance').text(distance - 1); // On enlève une unité de distance

        $('.log:last-of-type').append('<p> - Point ' + arrayPoint[distance].name + ' vers ' + arrayPoint[distance - 1].name + '</p>');
    }

    refreshLine(); // On actualise la position visuel de la jeep
});

// Evenement correspondant à prendre un bidon
$(document).on('click', '.take', function() {

    var distance = parseInt($('.distance').text()), reservoir = $('.reservoir').text(), bidonT = parseInt($('.bidonT').text()) ;

    if(arrayPoint[distance].bidon != 0 && bidonT < parseInt($('.capacity').val())) // Que si il y a un bidon au point + il y a encore de la place dans le coffre
    {
        $('.bidonT').text(bidonT + 1); // On rajoute un bidon au coffre
        arrayPoint[distance].bidon -= 1; // On enlève un bidon au point correspondant
        $('.currentBidon').text(arrayPoint[distance].bidon); // Et on actualise

        $('.log:last-of-type').append('<p> - Prise d\'un bidon au point ' + arrayPoint[distance].name);
    }

    refreshLine(); // On actualise la position visuel de la jeep
});

// Evenement correspondant à poser un bidon
$(document).on('click', '.drop', function() {

    var bidonT = parseInt($('.bidonT').text()), distance = parseInt($('.distance').text());

    if(bidonT != 0) // Si on a bien un bidon dans le coffre
    {
        arrayPoint[distance].bidon += 1; // On ajoute un bidon au point actuel
        $('.bidonT').text(bidonT - 1); // On enlève le bidon du coffre
        $('.currentBidon').text(arrayPoint[distance].bidon); // On affiche le nouveau nombre de bidon


        $('.log:last-of-type').append('<p> - Pose d\'un bidon au point ' + arrayPoint[distance].name);
    }

    refreshLine(); // On actualise la position visuel de la jeep
});

// Evenement correspondant à utliser un bidon
$(document).on('click', '.use', function() {

    var reservoir = $('.reservoir').text(), bidonT = parseInt($('.bidonT').text());

    if(bidonT != 0 && reservoir == 'Vide') // Si on a un bidon + le réservoir est vide
    {
        $('.bidonT').text(bidonT - 1); // On enlève le bidon du coffre
        $('.reservoir').text('Plein'); // On affecte la valeur 'Plein' au réservoir
    }

    refreshLine(); // On actualise la position visuel de la jeep
});

// Evenement correspondant à changer le nombre de bidon à la réserve
$(document).on('input', '.reserve', function() {

    var distance = parseInt($('.distance').text());

    resetPoint();

    $('.blocLog').empty();
    $('.blocLog').append('<span class="label label-warning"><span class="numberConsole">1</span>er Voyage : </span> <br /><br />');
    $('.blocLog').append('<div class="log"></div>');

    $('.distance').text(0); // On remet toutes les valeurs à 0
    arrayPoint[0].bidon = $(this).val(); // On assigne au point 'Réserve' le nouveau nombre de bidon
    $('.currentPoint').text(arrayPoint[0].name);
    $('.currentBidon').text(arrayPoint[0].bidon);
    $('.bidonT').text(0);
    $('.reservoir').text('Plein');

    refreshLine();
});

// Evenement correspondant à changer le nombre de bidon transportable
$(document).on('input', '.capacity', function() {

    var distance = parseInt($('.distance').text());

    resetPoint();

    $('.blocLog').empty();
    $('.blocLog').append('<span class="label label-warning"><span class="numberConsole">1</span>er Voyage : </span> <br /><br />');
    $('.blocLog').append('<div class="log"></div>');

    $('.distance').text(0); // On remet toutes les valeurs à 0
    arrayPoint[0].bidon = $('.reserve').val();
    $('.currentPoint').text(arrayPoint[0].name);
    $('.currentBidon').text(arrayPoint[0].bidon);
    $('.bidonT').text(0);
    $('.reservoir').text('Plein');

    refreshLine();
});

// Evenement correspondant à réinitialiser l'app
$(document).on('click', '.reset', function() {

    resetPoint();

    $('.distance').text(0); // On remet toutes les valeurs à 0
    $('.currentPoint').text(arrayPoint[0].name);
    $('.currentBidon').text(arrayPoint[0].bidon);
    $('.bidonT').text(0);
    $('.reservoir').text('Plein');

    newLog();
    refreshLine();
});