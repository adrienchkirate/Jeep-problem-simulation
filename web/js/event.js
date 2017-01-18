var arrayPoint   = ['Réserve', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

for (var i = 0; i < 26; i++)
{
    if(arrayPoint[i] == 'Réserve') {
        arrayPoint[i] = {
            name: arrayPoint[i],
            bidon: parseInt($('.reserve').text())
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

function refreshLine()
{
    var distance = parseInt($('.distance').text());


    $('.ligne').empty();
    $('.ligne').append('<p style="float: right">Bidon au point</p> <p>Point</p>')

    for(var i=0; i < arrayPoint.length; i++)
    {

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


refreshLine();

$(document).on('click', '.forward', function() {

    var distance = parseInt($('.distance').text()), reservoir = $('.reservoir').text();

    if(reservoir != 'Vide')
    {
        $('.currentBidon').text(arrayPoint[distance + 1].bidon);
        $('.reservoir').text('Vide');
        $('.currentPoint').text(arrayPoint[distance + 1].name);
        $('.distance').text(distance + 1);
    }

    refreshLine();
});

$(document).on('click', '.backward', function() {

    var distance = parseInt($('.distance').text()), reservoir = $('.reservoir').text();

    if(reservoir != 'Vide' && arrayPoint[distance].name != 'Réserve')
    {
        $('.currentBidon').text(arrayPoint[distance - 1].bidon);
        $('.reservoir').text('Vide');
        $('.currentPoint').text(arrayPoint[distance - 1].name);
        $('.distance').text(distance - 1);
    }

    refreshLine();
});

$(document).on('click', '.take', function() {

    var distance = parseInt($('.distance').text()), reservoir = $('.reservoir').text(), bidonT = parseInt($('.bidonT').text()) ;

    if(arrayPoint[distance].bidon != 0 && bidonT < parseInt($('.capacity').text()))
    {
        $('.bidonT').text(bidonT + 1);
        arrayPoint[distance].bidon -= 1;
        $('.currentBidon').text(arrayPoint[distance].bidon);
    }

    refreshLine();
});


$(document).on('click', '.drop', function() {

    var bidonT = parseInt($('.bidonT').text()), distance = parseInt($('.distance').text());

    if(bidonT != 0)
    {
        arrayPoint[distance].bidon += 1;
        $('.bidonT').text(bidonT - 1);
        $('.currentBidon').text(arrayPoint[distance].bidon);
    }

    refreshLine();
});

$(document).on('click', '.use', function() {

    var reservoir = $('.reservoir').text(), bidonT = parseInt($('.bidonT').text());

    if(bidonT != 0 && reservoir == 'Vide')
    {
        $('.bidonT').text(bidonT - 1);
        $('.reservoir').text('Plein');
    }

    refreshLine();
});