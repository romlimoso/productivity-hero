// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("node-basic-auth1 JS imported successfully!");
});

const stockData = 
{
  "Meta Data": {
    "1. Information": "Daily Prices (open, high, low, close) and Volumes",
    "2. Symbol": "MSFT",
    "3. Last Refreshed": "2023-02-15",
    "4. Output Size": "Compact",
    "5. Time Zone": "US/Eastern"
},
"Time Series (Daily)": {
    "2023-02-15": {
        "1. open": "268.3200",
        "2. high": "270.7300",
        "3. low": "266.1800",
        "4. close": "269.3200",
        "5. volume": "28962163"
    },
    "2023-02-14": {
        "1. open": "272.6700",
        "2. high": "274.9700",
        "3. low": "269.2800",
        "4. close": "272.1700",
        "5. volume": "37047924"
    },
    "2023-02-13": {
        "1. open": "267.6400",
        "2. high": "274.6000",
        "3. low": "267.1500",
        "4. close": "271.3200",
        "5. volume": "44630921"
    }
  }
}

const sample = {
  id: 1

}

axios.get("/data")
	.then(response => {
    console.log(response)

		printChart(response.data)
	})
	.catch(err => err)
 

const printChart = userData => {
	console.log(userData)

  		let dataArrays = []

      for (let i=0; i < userData.length; i++){
        for (let j=0; j < 8; j++){

          let dayLogKeys = []
          let aggregatedDayLogValues = []

          dayLogKeys = Object.keys(userData[i].logs[0])
          console.log(dayLogKeys)

          for (let k=0; k < userData[i].logs.length; k++){
            aggregatedDayLogValues.push(userData[i].logs[k][dayLogKeys[j]])
          }

          dataArrays.push(aggregatedDayLogValues)
        }
      }

      console.log("DATAARRAYS: ", dataArrays)


	// this is the data for the x axis
	const days = dataArrays[1]
	console.log(dataArrays[1])
	
	// this is the data for the y axis
	const prodHours = dataArrays[2]
	console.log(dataArrays[2])

  const lessProdHours = dataArrays[3]
  const sleepHours = dataArrays[4]

  const nutrition = dataArrays[5]
  let nutritionBubble = []
  for (let i=0; i < nutrition.length; i++){
    nutritionBubble.push([0, 12, nutrition[i]*3])
  }
  let invisibleBubble = []
  for (let i=0; i < nutrition.length; i++){
    invisibleBubble.push([0, 2, 1])
  }

	// draw the chart
	const ctx = document.querySelector('.myChart').getContext('2d')

	new Chart(ctx, {
		type: 'bar',
		data: {
			// x axis
			labels:  days,
			datasets: [
				{
					label: 'Productive Hours',
					backgroundColor: 'rgb(255, 20, 132)',
					borderColor: 'rgb(255, 99, 132)',
					// y axis
					data: prodHours,
          order: 3
				},
        {
          label: 'Less Productive Hours',
					backgroundColor: 'rgb(80, 0, 0)',
					borderColor: 'rgb(255, 99, 132)',
					// y axis
					data: lessProdHours,
          order: 4
        },
        {
          type: 'line',
          data: sleepHours,
          label: 'Hours of Sleep',
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: 'rgb(255, 255, 255)',
          order: 1
        },
        {
          type: 'bubble',
          data: nutritionBubble,
          label: 'Quality of Nutrition',
          borderColor: 'rgb(255,127,80)',
          backgroundColor: 'rgb(255,127,80)',
          order: 2
        },
        {
          type: 'bubble',
          data: invisibleBubble,
          label: 'Quality of Nutrition',
          borderColor: 'rgb(255,127,80)',
          backgroundColor: 'rgb(255,127,80)',
          order: 5
        }

        
			]
    },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
		
	}
  )
}



//printChart(stockData)
