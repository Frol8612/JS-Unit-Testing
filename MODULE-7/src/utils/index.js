const randomSubject = () => Math.random().toString(36).slice(2);
const normalizeBy = (obj, func) => func(
  Object.keys(obj)[0],
  Object.values(obj)[0],
);
const subjectLocate = (subject) => `span[title='${subject}']`;

module.exports = {
  randomSubject,
  normalizeBy,
  subjectLocate,
};
