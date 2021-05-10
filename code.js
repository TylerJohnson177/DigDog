let gameArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,];
let clickArray = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,];
const numBones = 5;
let totalPercent = 0;
let bonesRemaining = numBones;
let bonesCount = 0;
let newH;

$(document).ready(function ()
{
    let idCount = 0;

    //generate the grid

    for(let i = 0; i < numBones; i++)
    {
        for(let j = 0; j < numBones; j++)
        {
            //generate ids for each span
            let newSpan = $(`<span id="${idCount}">`);
            idCount ++;
            $("p#gameGrid").append(newSpan);
        }
        $("p#gameGrid").append("<br>");
    }

    //generate 5 random numbers between 0 and 24 to set the array index to true

    let index;

    for(let i = 0; i < numBones; i++)
    {
        do
        {
           index = (Math.floor(Math.random() * (numBones * numBones) - 1));
        }
        while(gameArray[index] === true)

        gameArray[index] = true;
    }

    $("#bonesRemaining").text(`Bones Remaining: ${bonesRemaining}`)

    $("span").on("click",game);

});

function game()
{
    let span = $(this);
    let spanID = $(this).attr("id");

    //test whether the given span has a bone or not

        if(clickArray[spanID] === false)
        {
            if(gameArray[spanID] === true)
            {
                span.addClass("bone");

                //subtract 1 from bones remaining
                bonesRemaining -= 1;
                $("#bonesRemaining").text(`Bones Remaining: ${bonesRemaining}`)
                bonesCount ++;
            }
            else
            {
                span.addClass("noBone");
            }

            //generate a random percent

            let randomPercent = Math.floor(Math.random() * ( 4 / ( numBones * numBones ) * 100) - ( 1 / ( numBones * numBones) * 100) + ( 1 / ( numBones * numBones) * 100));
            totalPercent += randomPercent


            //add the percent to the danger meter

            for(let i = 1; i < randomPercent; i++)
            {

                //Break out of the loop is totalPercent is greater than or equal to 100

                if(totalPercent >= 100)
                {
                    break;
                }
                else
                {
                    newH = $("<h2>");
                    $("p#dangerLevel").append(newH);
                }

            }

            //make all spans non-clickable once danger percent reaches 100

            if(totalPercent >= 100)
            {
                for(let i = 0; i < clickArray.length; i++)
                {
                    clickArray[i] = true;
                    totalPercent = 100;
                }
                $("p#output").text("BAD DOG, get off my lawn!");

                //reset the danger meter to match 100% to prevent overflow

                $("p#dangerLevel").text("");

                for(let i = 0; i < 90; i++)
                {
                    newH = $("<h2>");
                    $("p#dangerLevel").append(newH);
                }

            }

            if(bonesCount === numBones)
            {
                for(let i = 0; i < clickArray.length; i++)
                {
                    clickArray[i] = true;
                }
                $("p#output").text("YOU WIN!");
            }

            $("P#dangerPercent").text(`${totalPercent}%`)
        }

        // make spans non-clickable once clicked

    clickArray[spanID] = true;


}

