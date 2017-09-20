module.exports = (app, connection) => {
  require('./AuthRoute')(app, connection);
  require('./ClassRoute')(app, connection);
  require('./CourseHasDocumentRoute')(app, connection);
  require('./CourseRoute')(app, connection);
  require('./DocumentRoute')(app, connection);
  require('./ExerciceRoute')(app, connection);
  require('./HelpRequestRoute')(app, connection);
  require('./LevelHasSpecialtyRoute')(app, connection);
  require('./LevelRoute')(app, connection);
  require('./QCMRoute')(app, connection);
  require('./SpecialtyRoute')(app, connection);
  require('./StudentRoute')(app, connection);
  require('./StudentExerciceRoute')(app, connection);
  require('./SubjectRoute')(app, connection);
  require('./TeacherRoute')(app, connection);
  require('./UserRoute')(app, connection);
};
