import Swen from "../Assets/Swen.png";
import Karla from "../Assets/Karla.png";
import Maria from "../Assets/Maria.png";
import Duck from "../Assets/duck.png";
import Sunglasses from "../Assets/sunglasses.png";
import Shoe from "../Assets/shoe.png";

const img = [Karla, Maria, Swen];
function imgRandom(imgArr) {
  return imgArr[Math.floor(Math.random() * imgArr.length)];
}

const HEAD = (
  <img
    src={imgRandom(img)}
    alt="Logo"
    style={{
      width: "150px",
      height: "150px",

      position: "absolute",
      top: "25px",
      right: "-70px",
      zIndex: 1,
    }}
  />
);

const BODY = (
  <div
    style={{
      width: "10px",
      height: "100px",
      background: "white",
      position: "absolute",
      top: "175px",
      right: 0,
    }}
  />
);

const RIGHT_ARM = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "white",
      position: "absolute",
      top: "200px",
      right: "-100px",
      rotate: "-30deg",
      transformOrigin: "left bottom",
    }}
  />
);

const LEFT_ARM = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "white",
      position: "absolute",
      top: "200px",
      right: "10px",
      rotate: "30deg",
      transformOrigin: "right bottom",
    }}
  />
);

const RIGHT_LEG = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "white",
      position: "absolute",
      top: "255px",
      right: "-90px",
      rotate: "60deg",
      transformOrigin: "left bottom",
    }}
  />
);

const LEFT_LEG = (
  <div
    style={{
      width: "100px",
      height: "10px",
      background: "white",
      position: "absolute",
      top: "255px",
      right: 0,
      rotate: "-60deg",
      transformOrigin: "right bottom",
    }}
  />
);

const DUCK = (
  <img
    src={Duck}
    alt="Logo"
    style={{
      width: "70px",
      height: "70px",

      position: "absolute",
      top: "110px",
      right: "-120px",
      zIndex: 1,
    }}
  />
);

const RIGHT_SHOE = (
  <img
    src={Shoe}
    alt="Logo"
    style={{
      width: "80px",
      height: "100px",

      position: "absolute",
      top: "265px",
      right: "30px",
      zIndex: 3,
    }}
  />
);

const LEFT_SHOE = (
  <img
    src={Shoe}
    alt="Logo"
    style={{
      width: "80px",
      height: "100px",

      position: "absolute",
      top: "265px",
      right: "-100px",
      zIndex: 3,
      transform: "scaleX(-1)",
    }}
  />
);

const SUN = (
  <img
    src={Sunglasses}
    alt="Logo"
    style={{
      width: "150px",
      height: "150px",

      position: "absolute",
      top: "25px",
      right: "-70px",
      zIndex: 3,
    }}
  />
);

const BODY_PARTS = [
  HEAD,
  BODY,
  RIGHT_ARM,
  LEFT_ARM,
  RIGHT_LEG,
  LEFT_LEG,
  RIGHT_SHOE,
  LEFT_SHOE,
  DUCK,
  SUN,
];

export function HangmanDrawing({ numberOfGuesses }) {
  return (
    <div style={{ position: "relative" }}>
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div
        style={{
          height: "50px",
          width: "10px",
          background: "white",
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
      <div
        style={{
          height: "10px",
          width: "200px",
          background: "white",
          marginLeft: "120px",
        }}
      />
      <div
        style={{
          height: "400px",
          width: "10px",
          background: "white",
          marginLeft: "120px",
        }}
      />
      <div style={{ height: "10px", width: "250px", background: "white" }} />
    </div>
  );
}
