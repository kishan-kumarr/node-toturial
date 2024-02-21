//**** adding user */
$("#add_user").on("click", () => {
  alert(`User added successfylly`);
});

// **** updating user */
$("#update_user").on("click", function (e) {
  e.preventDefault();
  const _id = $("#userid").val();
  const name = $("#name").val();
  const email = $("#email").val();
  const gender = $("#gender").val();
  const status = $("#status").val();

  request = {
    url: `http://localhost:5000/api/users/${_id}`,
    method: "PATCH",
    data: { name, email, gender, status },
  };

  $.ajax(request).done((data) => {
    alert("User updated successfully");
    // console.log(data);
    location.href = "http://localhost:5000/";
  });

  console.log(_id, name, email, gender, status);
});

// *** deleting user **
$(".delete").on("click", function () {
  const _id = $(this).attr("data-id");

  request = {
    url: `http://localhost:5000/api/users/${_id}`,
    method: "DELETE",
  };

  if (confirm("Do you want to delete this record ?")) {
    $.ajax(request).done(function (data) {
      alert(`User deleted successfully`);
      location.reload();
    });
  }
});
