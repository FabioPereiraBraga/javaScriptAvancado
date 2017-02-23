var list = [
  {"desc":"rice","amount":"1","value":"5.40"},
  {"desc":"beer","amount":"12","value":"1.99"},
  {"desc":"meat","amount":"1","value":"15.00"}
];



function getTotal(list){
 var total = 0;
 for (var key in list ){
   total += list[key].value * list[key].amount;
 }
  return  formatValue(total);
}

function setList(list){
  var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
  for (var key in list) {
    table +='<tr><td>'+formatDesc(list[key].desc)+'</td><td>'+formatAmount( list[key].amount )+'</td><td>'+formatValue(list[key].value)+'</td><td> <button onclick="setUpdate('+key+')" class="btn btn-default" >Edit</button>  <button class="btn btn-default" onclick="deleteList('+key+')">Delete</button> </td></tr>';
  }
   table += '</tbody>';


   document.getElementById('listTable').innerHTML = table;
}

function formatDesc( desc ){
  var str = desc.toLowerCase();
  str = str.charAt(0).toUpperCase()+str.slice(1);

  return str;
}
function formatAmount( amount ){
  return parseInt(amount);
}

function formatValue( value ){
  var str = parseFloat(value).toFixed(2) + "";
  str = str.replace(".",",");
  str = "$ "+str;
  return str;
}

function add(){

  if(!validation()){
    return;
  }
  list.unshift({
      'desc':document.getElementById('desc').value,
      'amount':document.getElementById('amount').value,
      'value':document.getElementById('value').value
    })

   setList(list);
  document.getElementById('navTotal').innerHTML = getTotal(list);
}


function setUpdate( key ){
   document.getElementById('btnAdd').style.display = 'none';
   document.getElementById('btnUpdate').style.display = 'inline-block';

   document.getElementById('desc').value = list[key].desc;
   document.getElementById('amount').value = list[key].amount;
   document.getElementById('value').value = list[key].value;
   document.getElementById('inputTypeId').innerHTML = '<input type="hidden" value="'+key+'" id="idUpdate"/>';
}

function resetForm(){
   document.getElementById('btnAdd').style.display = 'inline-block';
   document.getElementById('btnUpdate').style.display = 'none';

   document.getElementById('desc').value = "";
   document.getElementById('amount').value = "";
   document.getElementById('value').value = "";
   document.getElementById('inputTypeId').innerHTML = '';
}

function updateForm()
{
  if(!validation()){
    return;
  }

  var id = document.getElementById('idUpdate').value;

  list[id] = {
      'desc':document.getElementById('desc').value,
      'amount':document.getElementById('amount').value,
      'value':document.getElementById('value').value
    };

   setList(list);
   document.getElementById('navTotal').innerHTML = getTotal(list);
}

function deleteList( key ){
  if(confirm('Delete this item?')){
    list.splice(key, 1);
    setList(list);
  }
  document.getElementById('navTotal').innerHTML = getTotal(list);
}

function validation(){
var desc   = document.getElementById('desc').value;
var amount = document.getElementById('amount').value;
var value  = document.getElementById('value').value;
var errors = "";

if( desc === "" ){
    errors += '<p>Fill out description</p>';
}
if( amount === "" ){
    errors += '<p>Fill out a quantity</p>';
}else if (amount != parseInt(amount)) {
  errors += '<p>Fill out a valid amount</p>';
}

if( value === "" ){
    errors += '<p>Fill out value</p>';
}else if (value != parseFloat(value)) {
    errors += '<p>Fill out a valid value</p>';
}

if(errors !== ''){
  document.getElementById("errors").style.display = 'block';
  document.getElementById("errors").class = 'alert alert-danger';
  document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
   return 0;
}else{
  document.getElementById("errors").style.display = 'none';
  return 1;
}

}

  setList(list);
  document.getElementById('navTotal').innerHTML = getTotal(list);
