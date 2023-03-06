// $(document).ready(function()
// {
// // for status > transfer button
//     $('.fa-check-double').click(function()
//     {
//      var aa=$(this).val();
//       $.post('/movetask',{"_id":aa},function(tasks)
//       {
//         alert("Mobile returned & Status changed successfully..!");
//         location.reload('/home');
//       });
//     });

// // to change the status color after clicking on transfer button
//     $(function(tasks2)
//     {
//       if($(this).text()=="Incomplete")
//       {
//           $(this).css("backgroundColor","#FD052E");
//           $(this).css("color","white");
//       }
//       if($(this).text()=="Completed")
//       {
//           $(this).css("backgroundColor","#85FD2D");
//           $(this).css("color","black"); 
//       }
//     };

// });