
function tableToCSVText(table) {
 
    // Variable to store the final csv data
    let csv_data = "";
 
    // Get each row data
    const rows = table.getElementsByTagName('tr');
    for (const row of rows) {
 
        // Get each column data
        let cols = row.querySelectorAll('td,th');
 
        // Stores each csv row data
        for (let col of cols) {
            // Get the text data of each cell of
            // a row and push it to csvrow
            const tmp = col

            const url = tmp.getElementsByTagName('a')[0]?.href
            col = col.innerText.replaceAll(',', '').replaceAll('\n', '')
            if (url != undefined && col.textContent == 'Apply Now') {
                col = url 
            }
             
            if (tmp != cols[cols.length - 1 ]) {
            // Combine each column value with comma
                csv_data +=  (col + ',');
            } 
            else {
                // combine each row data with new line character
                csv_data += (col + ',' + '\n');
            }

        }
 
    }
 
  return csv_data
}

// Get all elements that are in the table and that have text, and enter the innerText of that element into the csv, move on to the next element from there. Alternatively, I could enter those into a db but that would require db setup which I have not done in a long while. Let us work with csvs with the interest of time.

// To me it looking at the html document it seems the tr and th elements are used. The tr element usually has either two divs children or just innerText that I will need to select via a query selector. That leads me to look up the CSS selector for the first child including the parent that has inner text and then just selecting that element, from there I can extract that elements innerText and push it to a csv.        
function main() {
    
    const tables = document.getElementsByTagName("table") 
    // we are going to discard the first table since it useless for us.
    const tb = tables[1]
    // call the table to csv function    
    const csvText = tableToCSVText(tb)
    const a = window.document.createElement("a")
    a.href = window.URL.createObjectURL(new Blob([csvText], {type: "text/csv"})) 
    a.download = "credit_cards.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

  }
 main()

