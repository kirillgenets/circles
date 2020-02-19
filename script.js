const CIRCLES_NAMES = [
  "Главная",
  "О",
  "Контакты",
  "Карта",
  "Конфиденциальность"
];
const CIRCLES_COLORS = ["#1F2041", "#4B3F72", "#417B5A", "#D0CEBA", "#E9D2C0"];
const MIN_CIRCLE_DIAMETER = 300;
const MAX_CIRCLE_DIAMETER = 400;
const BODY_PADDING = 20;

const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

const createCircleData = name => {
  const circlesData = [];

  const isAccidentWithAnotherCircle = (x, y, diameter) => {
    if (circlesData.length === 0) return true;

    circlesData.some(circleData => {
      return (
        x <= circleData.x + circleData.diameter &&
        x + diameter >= circleData.x &&
        y <= circleData.y + circleData.diameter &&
        y + diameter >= circleData.y
      );
    });
  };

  const getCircleCoordinates = diameter => {
    const position = {
      x: 0,
      y: 0
    };

    let indicator = false;

    while (!indicator) {
      position.x = getRandomInteger(
        BODY_PADDING,
        document.body.clientWidth - BODY_PADDING - diameter
      );

      position.y = getRandomInteger(
        BODY_PADDING,
        document.body.clientHeight - BODY_PADDING - diameter
      );

      indicator = isAccidentWithAnotherCircle(position.x, position.y, diameter);
    }

    return position;
  };

  const diameter = getRandomInteger(MIN_CIRCLE_DIAMETER, MAX_CIRCLE_DIAMETER);

  return {
    name,
    diameter,
    ...getCircleCoordinates(diameter)
  };
};

const renderSingleCircle = ({ name, x, y, diameter, color }) => {
  const circleElement = document.createElement("div");

  circleElement.className = "circle";
  circleElement.textContent = name;

  circleElement.style.width = `${diameter}px`;
  circleElement.style.height = `${diameter}px`;
  circleElement.style.left = `${x}px`;
  circleElement.style.top = `${y}px`;

  return circleElement;
};

const circlesData = CIRCLES_NAMES.map(createCircleData);
document.body.append(...circlesData.map(data => renderSingleCircle(data)));
