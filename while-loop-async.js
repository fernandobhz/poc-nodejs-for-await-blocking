const cb500ms = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  })
}


(async () => {
  let i = 0;

  while(true) {
    await cb500ms();
    console.log(++i);
  }
})();
