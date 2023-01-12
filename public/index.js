// function main(){
//     const countContainer = document.querySelector('#count-container');
//     const incrementButton = document.querySelector('#increment-button');
//     const decrementButton = document.querySelector('#decrement-button');

//     let countValue = 0;

//     function increment(){
//         countValue++;
//         countContainer.textContent = countValue;
//     }

//     function decrement(){
//         countValue--;
//         countContainer.textContent = countValue;
//     }

//     incrementButton.addEventListener('click', increment);
//     decrementButton.addEventListener('click', decrement);
//     countContainer.textContent = countValue;
// }
// main()

//make the wholpe main funcction an await 
async function main(){
    const countContainer = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');

    //get value from ip
    let getVal = await fetch("http://127.0.0.1:9001/counter")
    let fetchedVal = await getVal.json()
    console.log(fetchedVal)
    //define countValue
    let countValue = fetchedVal.value
    console.log(countValue)

    //make incriment function wait for server
    async function increment(){
        countValue++;
        countContainer.textContent = countValue;
        let m = await fetch("http://127.0.0.1:9001/counter",
        {
            method:"PATCH",
            headers: {'Content-Type':"application/json"},
            body: JSON.stringify({value: countValue})
        })
    }

    async function decrement(){
        countValue--;
        countContainer.textContent = countValue;
        let m = await fetch("http://127.0.0.1:9001/counter",
        {
            method:"PATCH",
            headers: {'Content-Type':"application/json"},
            body: JSON.stringify({value: countValue})
        })
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    countContainer.textContent = countValue;
}
main()