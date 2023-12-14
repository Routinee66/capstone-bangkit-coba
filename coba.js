const x = {};

const a = {
  nama: "aaa",
  umur: "11"
}

const b = {
  "nama": "bbb",
  "umur": "22"
}

const c = {
  "nama": "ccc",
  "umur": "33"
}

x["yy"] = [];
x["xx"] = [];

x["xx"].push(a);
x["yy"].push(b);
x["yy"].push(c);

console.log(x);