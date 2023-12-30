const computeStars = (barWidth) => {
    let stars;

    const numberString = barWidth.value.replace('%', '');
    const currentVal = JSON.parse(numberString);

    if (currentVal >= 66.66) {
        stars = 3
    } else if (currentVal >= 33.33) {
        stars = 2
    } else {
        stars = 1
    }

    return stars
}

export default computeStars