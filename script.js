var controlSize = 0;
var code = [];
var error_bit;

function checkBitNumber(myBit) {
	switch (myBit)
	{
	case "bits_4":
        controlSize = 4;
        document.getElementById("inputDataTextbox").maxLength = 4;
		break

	case "bits_8":
        controlSize = 8;
        document.getElementById("inputDataTextbox").maxLength = 8;
		break

    case "bits_16":
        controlSize = 16;
        document.getElementById("inputDataTextbox").maxLength = 16;
        break

	default:
		alert("You must select a bit.");
	}
    return controlSize;
}

function computeHammingCode()
{
    var i = 0;
    var parity_number = 0;
    var inputs = document.getElementById("inputDataTextbox").value;
    const split_input = inputs.split("");
    var reverse_input = split_input.reverse();

    if(!(inputs.length == controlSize))
    {
        alert("You must enter " + controlSize +" characters.");
        return false;
    }

    switch (controlSize)
	{
	case 4:
        code[2] = reverse_input[0];
        code[4] = reverse_input[1];
        code[5] = reverse_input[2];
        code[6] = reverse_input[3];

        code[0] = code[2] ^ code[4] ^ code[6];
        code[1] = code[2] ^ code[5] ^ code[6];
        code[3] = code[4] ^ code[5] ^ code[6];

        while(reverse_input.length > parseInt(Math.pow(2, i) - (i + 1))){
            parity_number++;
            i++;
        }

		break;

	case 8:
        code[2] = reverse_input[0];
        code[4] = reverse_input[1];
        code[5] = reverse_input[2];
        code[6] = reverse_input[3];
        code[8] = reverse_input[4];
        code[9] = reverse_input[5];
        code[10] = reverse_input[6];
        code[11] = reverse_input[7];

        code[0] = code[2] ^ code[4] ^ code[6] ^ code[8] ^ code[10];
        code[1] = code[2] ^ code[5] ^ code[6] ^ code[9] ^ code[10];
        code[3] = code[4] ^ code[5] ^ code[6] ^ code[11];
        code[7] = code[8] ^ code[9] ^ code[10] ^ code[11];

        while(reverse_input.length > parseInt(Math.pow(2, i) - (i + 1))){
        parity_number++;
        i++;
        }

        break;

    case 16:
        code[2] = reverse_input[0];
        code[4] = reverse_input[1];
        code[5] = reverse_input[2];
        code[6] = reverse_input[3];
        code[8] = reverse_input[4];
        code[9] = reverse_input[5];
        code[10] = reverse_input[6];
        code[11] = reverse_input[7];
        code[12] = reverse_input[8];
        code[13] = reverse_input[9];
        code[14] = reverse_input[10];
        code[16] = reverse_input[11];
        code[17] = reverse_input[12];
        code[18] = reverse_input[13];
        code[19] = reverse_input[14];
        code[20] = reverse_input[15];

        code[0] = code[2] ^ code[4] ^ code[6] ^ code[8] ^ code[10] ^ code[12] ^ code[14] ^ code[16] ^ code[18] ^ code[20];
        code[1] = code[2] ^ code[5] ^ code[6] ^ code[9] ^ code[10] ^ code[13] ^ code[14] ^ code[17] ^ code[18];
        code[3] = code[4] ^ code[5] ^ code[6] ^ code[11] ^ code[12] ^ code[13] ^ code[14] ^ code[19] ^ code[20];
        code[7] = code[8] ^ code[9] ^ code[10] ^ code[11] ^ code[12] ^ code[13] ^ code[14] ;
        code[15] = code[16] ^ code[17] ^ code[18] ^ code[19] ^ code[20];

        while(reverse_input.length > parseInt(Math.pow(2, i) - (i + 1))){
        parity_number++;
        i++;
        }

        break;

	default:
		alert("Error !");
	}
    


    console.log(code.reverse());
    var computedHammingCode = code.join("");

    $("#computeCodeButton").click(function(event) {
        $('#inputErrorTextbox').val(computedHammingCode);
    });

    var computed_hamming = "";

    computed_hamming = "<table border>"
    computed_hamming += "<tr>"
    computed_hamming += "<th>Hamming Code</th>"
    computed_hamming += "</tr><tr>"
    computed_hamming += "<td align=center>" + computedHammingCode + "</td>"
    computed_hamming += "</tr></table>"

    document.getElementById('a_p').innerHTML = computed_hamming;
   
    var bits_table = "";

    bits_table = "<table border>"
    bits_table += "<tr>"
    bits_table += "<th cellpadding=15>Data Bit</th> <th>Parity Bit</th> <th>Code</th>"
    bits_table += "</tr><tr>"
    bits_table += "<td align=center>" + (reverse_input.length) + "</td>"
    bits_table += "<td align=center>" + (parity_number) + "</td>"
    bits_table += "<td align=center>" + (code.length) + "</td>"
    bits_table += "</tr></table>"

    document.getElementById('b_p').innerHTML = bits_table;

    var hamming_table = "";

    hamming_table = "<table border>"
    hamming_table += "<tr>"
    
    for(i=code.length; i > 0; i--){
        hamming_table += "<th align=center>" + i + "</th>"
    }

    hamming_table += "</tr><tr>"

    for(i=0; i < code.length; i++){
        hamming_table += "<td align=center>" + code[i] + "</td>"
    }
    hamming_table += "</tr></table>"
    

    document.getElementById('c_p').innerHTML = hamming_table;

    return code;
}


function computeErrorCode(){
    var check_bit1, check_bit2, check_bit3, check_bit4, check_bit5 = 0;


    var error_inputs = document.getElementById("inputErrorTextbox").value;
    var s_error_input = error_inputs.split("");
    var r_error_input = s_error_input.reverse();

    console.log(error_inputs);
    console.log(s_error_input);
    console.log(r_error_input);
    

    if(code.length == 0){
        alert("You must enter the input data to be encoded !");
        
    }

    else{
    
        switch (controlSize)
        {
            case 4:

                check_bit1 = r_error_input[0] ^ r_error_input[2] ^ r_error_input[4] ^ r_error_input[6];
                check_bit2 = r_error_input[1] ^ r_error_input[2] ^ r_error_input[5] ^ r_error_input[6];
                check_bit3 = r_error_input[3] ^ r_error_input[4] ^ r_error_input[5] ^ r_error_input[6];

                error_bit = check_bit1 * 1 + check_bit2 * 2 + check_bit3 * 4;
                break;

            case 8:

                check_bit1 = r_error_input[0] ^ r_error_input[2] ^ r_error_input[4] ^ r_error_input[6] ^ r_error_input[8] ^ r_error_input[10];
                check_bit2 = r_error_input[1] ^ r_error_input[2] ^ r_error_input[5] ^ r_error_input[6] ^ r_error_input[9] ^ r_error_input[10];
                check_bit3 = r_error_input[3] ^ r_error_input[4] ^ r_error_input[5] ^ r_error_input[6] ^ r_error_input[11];
                check_bit4 = r_error_input[7] ^ r_error_input[8] ^ r_error_input[9] ^ r_error_input[10] ^ r_error_input[11];

                error_bit = check_bit1 * 1 + check_bit2 * 2 + check_bit3 * 4 + check_bit4 * 8;
                break;

            case 16:
                check_bit1 = r_error_input[0] ^ r_error_input[2] ^ r_error_input[4] ^ r_error_input[6] ^ r_error_input[8] ^ r_error_input[10] ^ r_error_input[12] ^ r_error_input[14] ^ r_error_input[16] ^ r_error_input[18] ^ r_error_input[20];
                check_bit2 = r_error_input[1] ^ r_error_input[2] ^ r_error_input[5] ^ r_error_input[6] ^ r_error_input[9] ^ r_error_input[10] ^ r_error_input[13] ^ r_error_input[14] ^ r_error_input[17] ^ r_error_input[18];
                check_bit3 = r_error_input[3] ^ r_error_input[4] ^ r_error_input[5] ^ r_error_input[6] ^ r_error_input[11] ^ r_error_input[12] ^ r_error_input[13] ^ r_error_input[14];
                check_bit4 = r_error_input[7] ^ r_error_input[8] ^ r_error_input[9] ^ r_error_input[10] ^ r_error_input[11] ^ r_error_input[12] ^ r_error_input[13] ^ r_error_input[14];
                check_bit5 = r_error_input[15] ^ r_error_input[16] ^ r_error_input[17] ^ r_error_input[18] ^ r_error_input[19] ^ r_error_input[20];


                error_bit = check_bit1 * 1 + check_bit2 * 2 + check_bit3 * 4 + check_bit4 * 8 + check_bit5 * 16;
                break;

            default:
                alert("Error !");
            }
            
            console.log(error_bit);

            var error_table = "";

            error_table = "<table border>"
            error_table += "<tr>"
            
            for(i=r_error_input.length; i > 0; i--){
                error_table += "<th align=center>" + i + "</th>"
            }

            error_table += "</tr><tr>"

            if(error_bit == 0){

                for(i= r_error_input.length - 1 ; i >= 0; i--){
                    error_table += "<td align=center>" + r_error_input[i] + "</td>"
                }    
            }

            else{

                for(i= r_error_input.length - 1 ; i >= 0; i--){

                    if(i == (error_bit - 1) ){
                        error_table += "<td align=center style=background-color:yellow>" + r_error_input[error_bit-1] + "</td>"
                    }

                    else{
                        error_table += "<td align=center>" + r_error_input[i] + "</td>"
                    }
                    
                }   
            }

            
            
            error_table += "</tr></table>"

            document.getElementById('d_p').innerHTML = error_table;

            var text_error_position = "";

            if(error_bit == 0){
                text_error_position = "<p style=font-size:23px;color:#a9ff00;text-shadow: 2px 2px 4px #000000;>There is no error in data.</p>"
            }

            else{
                text_error_position = "<p style=font-size:23px;color:red;text-shadow: 2px 2px 4px #000000;>" + "There is error in the  " + error_bit + "-bit ." + "</p>"
            }
            document.getElementById('e_p').innerHTML = text_error_position;

        
        }

    
}