function numToMonth(num){
    const dict = {
        1: "siječanj",
        2: "veljača",
        3: "ožujak",
        4: "travanj",
        5: "svibanj",
        6: "lipanj",
        7: "srpanj",
        8: "kolovoz",
        9: "rujan",
        10: "listopad",
        11: "studeni",
        12: "prosinac"
    }

    return dict[parseInt(num,10)] || "nepoznat mjesec";
}

export {numToMonth}