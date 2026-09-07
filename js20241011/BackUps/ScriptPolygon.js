// JavaScript source code

switch (gameType) {
			case 'A':


function setArrow() {

    //int n = 10;
    let n = 10;

    //int[] xx = new int[n];
    const xx = [];

    //int[] yy = new int[n];
    const yy = [];
   
    //int z1 = 0, z2 = 0, z3 = 0, z4 = 0, z5 = 0, z6 = 0;
    let z1 = 0;    let z2 = 0;    let z3 = 0;    let z4 = 0;    let z5 = 0;    let6 z = 0;

    //int t = size * 4;
    let t = size * 4;

    switch (direction) {
      case 90:
      case 270:
        w = 10 + size * 12;
        h = 10 + size * 7;
        z1 = h / 2 - t / 4;
        z2 = h / 2 + t / 4;
        z3 = w - t;
        z4 = w / 2;
        break;
      case 0:
      case 180:
        h = 10 + size * 14;
        w = 10 + size * 7;
        z1 = w / 2 - t / 4;
        z2 = w / 2 + t / 4;
        z3 = h - t;
        z4 = h / 2;
        break;

      case 45:
      case 135:
      case 225:
      case 315:
        w = 10 + size * 7;
        h = 10 + size * 7;
        z1 = w / 2;
        z2 = w - t / 2;
        z3 = t / 2;
        z4 = w - t;
        z5 = w / 2 - t;
        z6 = w / 2 + t;
      break;
    }

    setSize(w, h);

    switch (direction) {
      case 315:
        xx[0] += w; yy[0] += z2;
        xx[1] += t; yy[1] += z3;
        xx[2] += z6; yy[2] += z3;
        xx[3] += z6; yy[3] += 0;
        xx[4] += 0; yy[4] += 0;
        xx[5] += 0; yy[5] += z6;
        xx[6] += z3; yy[6] += z6;
        xx[7] += z3; yy[7] += t;
        xx[8] += z2; yy[8] += h;
        xx[9] += w; yy[9] += h;
        break;
      case 225:
        xx[0] += w - z3; yy[0] += 0;
        xx[1] += z3; yy[1] += z4;
        xx[2] += z3; yy[2] += z5;
        xx[3] += 0; yy[3] += z5;
        xx[4] += 0; yy[4] += h;
        xx[5] += z6; yy[5] += h;
        xx[6] += z6; yy[6] += z2;
        xx[7] += t; yy[7] += z2;
        xx[8] += w; yy[8] += z3;
        xx[9] += w; yy[9] += 0;
        poly = new Polygon(xx, yy, 10); // Polygon(int[] xpoints, int[] ypoints, int npoints)
        break;
      case 135:
        xx[0] += 0; yy[0] += z3;
        xx[1] += z4; yy[1] += z2;
        xx[2] += z5; yy[2] += z2;
        xx[3] += z5; yy[3] += h;
        xx[4] += w; yy[4] += h;
        xx[5] += w; yy[5] += z5;
        xx[6] += z2; yy[6] += z5;
        xx[7] += z2; yy[7] += z4;
        xx[8] += z3; yy[8] += 0;
        xx[9] += 0; yy[9] += 0;
        poly = new Polygon(xx, yy, 10); // Polygon(int[] xpoints, int[] ypoints, int npoints)
        break;
      case 45:
        xx[0] += z3; yy[0] += h;
        xx[1] += z2; yy[1] += t;
        xx[2] += z2; yy[2] += z1 + t;
        xx[3] += w; yy[3] += z1 + t;
        xx[4] += w; yy[4] += 0;
        xx[5] += z1 - t; yy[5] += 0;
        xx[6] += z1 - t; yy[6] += z3;
        xx[7] += w - t; yy[7] += z3;
        xx[8] += 0; yy[8] += h - z3;
        xx[9] += 0; yy[9] += h;
        poly = new Polygon(xx, yy, 10); // Polygon(int[] xpoints, int[] ypoints, int npoints)
        break;
      case 0:
        xx[0] += z2; yy[0] += h;
        xx[1] += z2; yy[1] += t;
        xx[2] += w; yy[2] += z4 + t;
        xx[3] += w; yy[3] += z4;
        xx[4] += z2; yy[4] += 0;
        xx[5] += z1; yy[5] += 0;
        xx[6] += 0; yy[6] += z4;
        xx[7] += 0; yy[7] += z4 + t;
        xx[8] += z1; yy[8] += t;
        xx[9] += z1; yy[9] += h;
        poly = new Polygon(xx, yy, 10); // Polygon(int[] xpoints, int[] ypoints, int npoints)
        break;
      case 90:
        xx[0] += 0; yy[0] += z1;
        xx[1] += z3; yy[1] += z1;
        xx[2] += z4 - t; yy[2] += 0;
        xx[3] += z4; yy[3] += 0;
        xx[4] += w; yy[4] += z1;
        xx[5] += w; yy[5] += z2;
        xx[6] += z4; yy[6] += h;
        xx[7] += z4 - t; yy[7] += h;
        xx[8] += z3; yy[8] += z2;
        xx[9] += 0; yy[9] += z2;
        poly = new Polygon(xx, yy, 10); // Polygon(int[] xpoints, int[] ypoints, int npoints)
        break;
      case 180:
        xx[0] += z1; yy[0] += 0;
        xx[1] += z1; yy[1] += z3;
        xx[2] += 0; yy[2] += z4 - t;
        xx[3] += 0; yy[3] += z4;
        xx[4] += z1; yy[4] += h;
        xx[5] += z2; yy[5] += h;
        xx[6] += w; yy[6] += z4;
        xx[7] += w; yy[7] += z4 - t;
        xx[8] += z2; yy[8] += z3;
        xx[9] += z2; yy[9] += 0;
        poly = new Polygon(xx, yy, 10); // Polygon(int[] xpoints, int[] ypoints, int npoints)
        break;
      case 270:
        xx[0] += w; yy[0] += z1;
        xx[1] += t; yy[1] += z1;
        xx[2] += z4 + t; yy[2] += 0;
        xx[3] += z4; yy[3] += 0;
        xx[4] += 0; yy[4] += z1;
        xx[5] += 0; yy[5] += z2;
        xx[6] += z4; yy[6] += h;
        xx[7] += z4 + t; yy[7] += h;
        xx[8] += t; yy[8] += z2;
        xx[9] += w; yy[9] += z2;
      break;
    }
    poly = new Polygon(xx, yy, 10); // Polygon(int[] xpoints, int[] ypoints, int npoints)
   
  }

class Polygon{
 constructor(xx, yy, n){


 }



}



