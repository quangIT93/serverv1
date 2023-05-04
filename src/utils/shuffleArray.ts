function shuffle(array: any[], maxSize: number = array.length) {
    let currentIndex = array.length;
    let randomIndex: number;
    let temp = maxSize;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];

      if (temp === 0) {
          break;
      }
      temp--;
    }

    return array.slice(0, maxSize);
}

export default shuffle;