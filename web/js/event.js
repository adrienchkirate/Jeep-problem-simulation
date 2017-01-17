var arrayPoint   = ['Réserve', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

for (var i = 0; i < 26; i++)
{
    if(arrayPoint[i] == 'A') {
        arrayPoint[i] = {
            name: arrayPoint[i],
            bidon: parseInt($('.reserve').text())
        };
    }
    else
    {
        arrayPoint[i] = {
            name: arrayPoint[i],
            bidon: 1
        };
    }
}

$(document).on('click', '.forward', function() {

    var distance = parseInt($('.distance').text()), fuelUnit = parseInt($('.fuelUnit').text());

    if(fuelUnit != 0)
    {
        $('.currentBidon').text(arrayPoint[distance + 1].bidon);
        $('.fuelUnit').text(fuelUnit - 1);
        $('.currentPoint').text(arrayPoint[distance + 1].name);
        $('.distance').text(distance + 1);
    }
});

$(document).on('click', '.backward', function() {

    var distance = parseInt($('.distance').text()), fuelUnit = parseInt($('.fuelUnit').text());

    if(fuelUnit != 0 && arrayPoint[distance].name != 'A')
    {
        $('.currentBidon').text(arrayPoint[distance - 1].bidon);
        $('.fuelUnit').text(fuelUnit - 1);
        $('.currentPoint').text(arrayPoint[distance - 1].name);
        $('.distance').text(distance - 1);
    }
});

$(document).on('click', '.take', function() {

    var distance = parseInt($('.distance').text()), fuelUnit = parseInt($('.fuelUnit').text()), bidonT = parseInt($('.bidonT').text()) ;

    if(arrayPoint[distance].bidon != 0 && bidonT < parseInt($('.capacity').text()))
    {
        $('.bidonT').text(bidonT + 1);
        arrayPoint[distance].bidon -= 1;
        $('.currentBidon').text(arrayPoint[distance].bidon);
    }
});


$(document).on('click', '.drop', function() {

    var bidonT = parseInt($('.bidonT').text()), distance = parseInt($('.distance').text());

    if(bidonT != 0)
    {
        arrayPoint[distance].bidon += 1;
        $('.bidonT').text(bidonT - 1);
        $('.currentBidon').text(arrayPoint[distance].bidon);
    }
});

$(document).on('click', '.use', function() {

    var fuelUnit = parseInt($('.fuelUnit').text()), bidonT = parseInt($('.bidonT').text());

    if(bidonT != 0)
    {
        $('.bidonT').text(bidonT - 1);
        $('.fuelUnit').text(fuelUnit + 1);
    }
});