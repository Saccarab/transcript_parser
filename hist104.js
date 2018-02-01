function vito_andolini(){

	//to-do remove arr[i] mods

	let keywords = ["INTERVIEW DATE:", "BIRTH DATE:", "RUNNING TIME:", "INTERVIEWER:", "RECORDING ENGINEER:",
	 "INTERVIEW LOCATION:", "TRANSCRIPT RECONCEIVED BY:", "TRANSCRIBER'S NOTE:", "TRANSCRIPT PREPARED BY:", "TRANSCRIPT REVIEWED BY:", "TRANSCRIPT ORIGINALLY PREPARED BY:", "TRANSCRIPT NOT REVIEWED"]

	let suff_lastname = ["DI", "VON", "DE", "DEL"]

	let grab = document.getElementById('input').value
	let arr = grab.split(" ")
	let parsed_text = ""
	let interv = []
	let interviewer = ""
	let immigrant = ""
	let text = ""
	let suff = false

	for (let i = 0; i < arr.length; i++){
		if (arr[i] === 'INTERVIEW' && arr[i+1] == 'DATE:'){
			arr[i] = "\nINTERVIEW DATE:"
			text += "<br><b>INTERVIEW DATE:</b>"
			arr.splice(i+1, 1);
		}
		else if (arr[i] === 'BIRTH' && arr[i+1] == 'DATE:'){
			arr[i] = "\nBIRTH DATE:"
			text += "<br><b>BIRTH DATE:</b>"
			// DI DE VON
			if (suff_lastname.includes(arr[i-2].toUpperCase())){
				immigrant = `${arr[i-2]} ${arr[i-1]}:`
				suff = true
			}
			else
				immigrant = arr[i-1].trim() + ':'
			arr.splice(i+1, 1);
		}
		else if (arr[i] === 'BIRTHDATE:'){
			immigrant = arr[i-1].trim() + ':'
			text += "<br><b>BIRTH DATE:</b>"	
		}
		else if (arr[i] === 'INTERVIEWER:'){
			arr[i] = "\nINTERVIEWER:"
			text += "<br><b>INTERVIEWER:</b>"
			let j = 1
			while (arr[i+j] !== 'RECORDING'){
				interv.push(arr[i+j])
				j++
			}
			interviewer = interv[interv.length - 1].trim()

			for (let i = 0; i < interv.length; i++){
				if (interv[i].includes("JR") || interv[i].includes("Jr") || interv[i].includes("SR"))
					interviewer = interv[i-1].slice(0, -1).trim()
			}

			interviewer += ':'
		}
		else if (arr[i] === 'INTERVIEW' && arr[i+1] === 'LOCATION:'){
			text += "<br><b>INTERVIEW LOCATION: </b>"
			arr.splice(i+1, 1);
		}
		else if (arr[i] === 'TRANSCRIPT' && arr[i+1] === 'PREPARED'){
			text += "<br><b>TRANSCRIPT PREPARED BY: </b>"
			arr.splice(i+1, 2);
		}
		else if (arr[i] === 'TRANSCRIPT' && arr[i+1] === 'REVIEWED'){
			text += "<br><b>TRANSCRIPT REVIEWED BY: </b>"
			arr.splice(i+1, 2);
		}
		else if (arr[i] === "TRANSCRIBER'S" && arr[i+1] === 'NOTE:'){
			text += "<br><b>TRANSCRIBER'S NOTE: </b>"
			arr.splice(i+1, 2);
		}
		else if (arr[i] === 'TRANSCRIPT' && arr[i+1] === 'NOT'){
			text += "<br><b>TRANSCRIPT NOT REVIEWED</b><br>"
			arr.splice(i+1, 2);
		}
		else if (arr[i] === 'TRANSCRIPT' && arr[i+1] === 'RECONCEIVED'){
			text += "<br><b>TRANSCRIPT RECONCEIVED BY: </b>"
			arr.splice(i+1, 2);
		}
		else if (arr[i] === 'TRANSCRIPT' && arr[i+1] === 'ORIGINALLY'){
			text += "<br><b>TRANSCRIPT ORIGINALLY PREPARED BY: </b>"
			arr.splice(i+1, 3);
		}
		else if (arr[i].toUpperCase() === 'ORAL' && arr[i+1].toUpperCase() === "HISTORIAN'S"){
			text += "<br><b>ORAL HISTORIAN'S NOTE: </b>"
			arr.splice(i+1, 2);
		}
		else if (arr[i] === 'RECORDING' && arr[i+1] === 'ENGINEER:'){
			text += "<br><b>RECORDING ENGINEER: </b>"
			arr.splice(i+1, 1);
		}
		else if (arr[i] === 'RUNNING' && arr[i+1] === 'TIME:'){
			text += "<br><b>RUNNING TIME: </b>"
			arr.splice(i+1, 1);
		}
		else if (arr[i] === interviewer){
			text += `<br><b>${interviewer} </b>`
		}
		else if (interviewer != "" && arr[i].substring(0, interviewer.length) === interviewer){
			text += `<br><b>${interviewer} </b>${arr[i].substring(interviewer.length, arr[i].length)} `
		}
		else if (arr[i] === immigrant){
			text += `<br><b>${immigrant} </b>`
		}
		else if (immigrant != "" && arr[i].substring(0, immigrant.length) === immigrant){
			text += `<br><b>${immigrant} </b>${arr[i].substring(immigrant.length, arr[i].length)} `
		}
		else if (suff && `${arr[i]} ${arr[i+1]}` === immigrant){
			text += `<br><b>${immigrant} </b>`
			i++ //skip once
		}

		else// nth
		{
			//check on 3rd speaker?
				text = text + arr[i] + " "
		}
			
	}
	
	let block = document.getElementById('text_block').innerHTML = text



}