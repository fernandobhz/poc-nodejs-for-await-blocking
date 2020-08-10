const express = require("express");
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const port = 3000;

mongoose.connect("mongodb://localhost/poc-for-await");

const loopSchema = new Schema({
  when: Date
});

const Loop = model('Loop', loopSchema);

const app = express();

app.get("/", (req, res) => res.send(`
  <h1>POC - for/while await loops</h1>

  <h2>
    This POC is to show that for/while loops DO NOT block the main thread/event loop/task queue
  </h2>

  <p>
    Bellow there are 2 commands who will perform longs loop on server side, pick one and watch the health-check<br>
    The health-check is a simple response from the server of the current date time, that page refreshes every 1 sec<br>
    <br>
    Please note that on one billion inserts the embedded health-check you get a delay, but it's because the browser it self.<br>
    Open the health check on another browser or tab to see that it isn't blocking
  </p>

  <h3>
    <a href="/while-true-set-timeout" target="cmds">While true setTimeout</a>
  </3>

  <h3>
    <a href="/one-billion-inserts" target="cmds">One billion inserts</a><br>
  </h3>

  <h3>
    <a href="/health-check" target="_blank">Health Check</a><br>
    <iframe src="/health-check" style="border: 1px solid red"></iframe>
  </h3>

  <p>
    Commands<br>
    <iframe name="cmds" style="1px solid blue; height: 300px"></iframe>
  </p>
`));

const cb500ms = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  })
}

app.get("/while-true-set-timeout", async (req, res) => {
  let i = 0;

  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write("<script>setInterval(function() {window.scrollTo(0,document.body.scrollHeight)}, 500)</script>");

  while(true) {
    await cb500ms();
    let msg = `while-loop #: ${++i}<br>`;
    res.write(msg);
  }
})

app.get("/one-billion-inserts", async (req, res) => {
  const BILLION = 1_000_000_000;

  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write("<script>setInterval(function() {window.scrollTo(0,document.body.scrollHeight)}, 500)</script>");

  await Loop.remove({});

  for (let i = 0; i < BILLION; i++) {
    const item = await Loop.create({
      when: new Date
    });

    let msg = `one-billion #: ${i}: ${item.when}<br>`;
    res.write(msg);
  }

})

app.get("/health-check", (req, res) => res.send(`
  <meta http-equiv="refresh" content="1">

  ${new Date}
`));

app.listen(port, () => {
  console.log(`Poc is running on localhost:${port}`)
})