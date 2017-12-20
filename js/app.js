var mostrarOcultar = function(e){
  var tabSeleccionado = e.target.dataset.tabSeleccionado;
  var overview = document.getElementById('overview');
  var students = document.getElementById('students');
  var teachers = document.getElementById('teachers');
  if (tabSeleccionado === 'tabOverview') {
    // ocultar
    students.style.display='none';
    teachers.style.display='none';
    // mostrar
    overview.style.display='block';

  } else if (tabSeleccionado ==='tabStudents') {
    // ocultar
    teachers.style.display='none';
    overview.style.display='none';
    // mostrar
    students.style.display='block';
  } else if (tabSeleccionado === 'tabTeachers') {
    // ocultar
    overview.style.display='none'
    students.style.display='none'
    // mostrar
    teachers.style.display='block'
  }
}
var cargarPagina = function(){
  var overview = document.getElementById('overview');
  var students = document.getElementById('students');
  var teachers = document.getElementById('teachers');
  overview.style.display='block';
  students.style.display='none';
  teachers.style.display='none';
  var elementosTab = document.getElementsByClassName('tab');
  for(var i = 0; i < elementosTab.length; i++){
    elementosTab[i].addEventListener('click', mostrarOcultar);
  }
}
cargarPagina();

  var generaciones = function(event){
    var contenedorTotal = document.getElementById('enrolled');
    contenedorTotal.innerHTML = " " + '# STUDENTS<br>CURRENTLY<br>ENROLLED';
    var porcentajeDesertoras = document.getElementById('dropout');
    porcentajeDesertoras.innerHTML = " " + '% DROPOUT';
    var indice = (event.target.selectedIndex);
      // console.log(indice);
    var lugar = event.target[indice].dataset.sede;
      // console.log(lugar);
    var generacion = event.target[indice].dataset.generacion;
      // console.log(generacion);
    dataObtains(lugar, generacion)
  };

  var dataObtains = function(lugar, generacion){
    var estudiantes = data[lugar][generacion]['students']; //acceder a los datos de los estudiantes;

    var studentsActive = 0; //contar a los estudiantes activos
    var studentsDesertors = 0; //contar a los estudiantes desertores
      // console.log('hola');
    for (var i = 0; i < estudiantes.length; i++) {
      var active = estudiantes[i].active;
        // var nombre = students[i].name;
        // console.log(nombre);
      if (active === true) {
        studentsActive ++;
          // console.log(studentsActive);
      } else if (active === false) {
        studentsDesertors++
      }
    }
    var total = studentsActive + studentsDesertors; //total estudiantes por generacion
    var desertoras = (studentsDesertors*100) / total; //numero de chicas que han desertado

    // graficas
    google.charts.load('current', {'packages':['corechart']});
         google.charts.setOnLoadCallback(drawChart);

         function drawChart() {

           var data = google.visualization.arrayToDataTable([
             ['Task', 'Hours per Day'],
             ['students', studentsActive],
             ['dropout', studentsDesertors],
           ]);

           var options = {
             title: ''
           };

           var chart = new google.visualization.PieChart(document.getElementById('piechart'));

           chart.draw(data, options);
         }

// promedio
var totalScoreTech = 0;
var totalScoreHSE = 0;
var contadorSprint = 0;
var contadorHSE = 0;
var promedioTech = 0;
var promedioHSE = 0;
var contadorStudentsTechHSe = 0;
var porcentajeTotalStudentsTech = 0;
var porcentajeTotalStudentsHSE = 0;


    for (var i=0; i < data[lugar][generacion]['students'].length; i++) {

      for (var j = 0; j < data[lugar][generacion]['students'][i]['sprints'].length; j++) {
        totalScoreTech += data[lugar][generacion]['students'][i]['sprints'][j].score.tech; //accediendo a los puntos de los sprints
// console.log("tech: " + totalScoreTech);

        totalScoreHSE += data[lugar][generacion]['students'][i]['sprints'][j].score.hse;
        // console.log("totalScoreTech"+totalScoreTech);
        if (data[lugar][generacion]['students'][i]['sprints'][j].score.tech >= 1260){
            contadorSprint++;
        }
        // console.log('j' + j + "----" + "totalScoreTech " + totalScoreTech);
        // console.log(contadorSprint);

        if (data[lugar][generacion]['students'][i]['sprints'][j].score.hse >= 840){
            contadorHSE++;
          }
        }

        promedioTech = totalScoreTech / data[lugar][generacion]['students'].length;
        promedioHSE = totalScoreHSE / data[lugar][generacion]['students'].length;


        if (promedioTech >= 1260 && promedioHSE >= 840) {
          contadorStudentsTechHSe++
        }

      //console.log("tech: " + totalScoreTech);

      //totalScoreTech = 0;
      //  totalScoreHSE = 0;
      // console.log("contadorSprint" +  contadorSprint);
    }
    porcentajeTotalStudentsTech = contadorStudentsTechHSe / total *100;

    console.log("porcentaje: " + porcentajeTotalStudentsTech);
    console.log("contador: " +contadorStudentsTechHSe);

    pintarResultado(total, desertoras)
  }

  var pintarResultado = function(total, desertoras){
    var contenedorTotal = document.getElementById('enrolled');
    var porcentajeDesertoras = document.getElementById('dropout');
    var contenido = document.createElement('p');
    var porcentaje = document.createElement('p');
    contenido.classList.add('contenido');
    porcentaje.classList.add('porciento');
    contenido.innerText = total;
    porcentaje.innerText = desertoras.toFixed(2);
    contenedorTotal.appendChild(contenido);
    porcentajeDesertoras.appendChild(porcentaje);
  }

// var generaciones = function(event){
//   var contenedorTotal = document.getElementById('enrolled');
//   contenedorTotal.innerHTML = " " + '# STUDENTS<br>CURRENTLY<br>ENROLLED';
//   var porcentajeDesertoras = document.getElementById('dropout');
//   porcentajeDesertoras.innerHTML = " " + '% DROPOUT';
//   var indice = (event.target.selectedIndex);
//     // console.log(indice);
//   var lugar = event.target[indice].dataset.sede;
//     // console.log(lugar);
//   var generacion = event.target[indice].dataset.generacion;
//     // console.log(generacion);
//   dataObtains(lugar, generacion)
// };
//
// var dataObtains = function(lugar, generacion){
//   var estudiantes = data[lugar][generacion]['students'];
//   var studentsActive = 0;
//   var studentsDesertors = 0;
//     // console.log('hola');
//   for (var i = 0; i < estudiantes.length; i++) {
//     var active = estudiantes[i].active;
//       // var nombre = students[i].name;
//       // console.log(nombre);
//     if (active === true) {
//       studentsActive ++;
//         // console.log(studentsActive);
//     } else if (active === false) {
//       studentsDesertors++
//     }
//   }
//   var total = studentsActive + studentsDesertors;
//   var desertoras = (studentsDesertors*100) / total;
//   pintarResultado(total, desertoras)
// }
