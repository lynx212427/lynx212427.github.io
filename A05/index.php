<?php
// Include the database connection
include('connect.php');

// Query to get data from the islandsofpersonality table
$sql_islands = "SELECT * FROM `islandsofpersonality` ORDER BY `islandOfPersonalityID` ASC";
$result_islands = $conn->query($sql_islands);

// Check if query was successful
if (!$result_islands) {
    die("Error in query: " . $conn->error);
}

// Query to get data from the islandcontents table
$sql_contents = "SELECT * FROM `islandcontents`";
$result_contents = $conn->query($sql_contents);

// Check if query was successful
if (!$result_contents) {
    die("Error in query: " . $conn->error);
}
?>
<!DOCTYPE html>
<html>
<head>
<title>SAM-BE: Inside Out Theme</title>
<link rel="icon" href="C:\\Users\\Win11\\Desktop\\Vs code\\SAM projects\\SAM-BE\\assets\\web_icon.ico">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
  body {
    background-color: #FFB6C1;
  }
html,body,h1,h2,h3,h4,h5,h6 {font-family: "Roboto", sans-serif}

/* Colors for Inside Out characters */
.inside-out-theme {
  background-color: #8e24aa; /* Fear - Violet */
  color: white;
}
.joy-color {
  background-color: #ffeb3b; /* Joy - Yellow */
  color: black;
}
.sadness-color {
  background-color: #1e88e5; /* Sadness - Blue */
  color: black;
}
.anger-color {
  background-color: #e53935; /* Anger - Red */
  color: white;
}
.fear-color {
  background-color: #8e24aa; /* Fear - Violet */
  color: white;
}
.disgust-color {
  background-color: #43a047; /* Disgust - Green */
  color: white;
}
.anxiety-color {
  background-color: #ff7043; /* New Character (Anxiety) - Orange */
  color: black;
}
.ennui-color {
  background-color: #A89CA6; /* New Character (Ennui) - purplish-grey */
  color: black;
}
.envy-color {
  background-color: turquoise; /* New Character (envy) - Turquoise */
  color: black;
}
.embarrassment-color {
  background-color: #FFB6C1; /* New Character (Embarrassment) - Light Pink */
  color: black;
}

/* Specific Header and Bar Styles */
.inside-out-header {
  color: #1e88e5; /* Sadness - Blue */
}
.inside-out-bar {
  background-color: #ffeb3b; /* Joy - Yellow */
}
</style>
</head>
<body class="ennui-color">

<!-- Page Container -->
<div class="w3-content w3-margin-top" style="max-width:1400px;">

  <!-- The Grid -->
  <div class="w3-row-padding embarrassment-color">
  
    <!-- Left Column -->
    <div class="w3-third ">
    
      <div class="w3 ennui-color  w3-card-4">
        <div class="w3-display-container">
          <img src="C:\\Users\\Win11\\Desktop\\Vs code\\SAM projects\\SAM-BE\\assets\\Me.jpg" style="width:100%" alt="Avatar">
          <div class="w3-display-bottomleft w3-container w3-text-black">
            <h2 class="sadness-color">Alfea Aemiel Mingua</h2>
          </div>
        </div>
        <div class="w3-container">
          <p><i class="fa fa-briefcase fa-fw w3-margin-right w3-large fear-color"></i>Designer</p>
          <p><i class="fa fa-home fa-fw w3-margin-right w3-large disgust-color"></i>Alaminos, Philippines</p>
          <p><i class="fa fa-envelope fa-fw w3-margin-right w3-large sadness-color"></i>mingualynx@gmail.com</p>
          <p><i class="fa fa-phone fa-fw w3-margin-right w3-large anger-color"></i>09753523360</p>
          <hr>

          <p class="w3-large"><b><i class="fa fa-asterisk fa-fw w3-margin-right anxiety-color"></i>Skills</b></p>
          <p>Adobe Photoshop</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge inside-out-bar" style="width:85%">85%</div>
          </div>
          <p>Canva</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge sadness-color" style="width:80%">80%</div>
          </div>
          <p>FlipaClip</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge disgust-color" style="width:75%">75%</div>
          </div>
          <p>Media</p>
          <div class="w3-light-grey w3-round-xlarge w3-small">
            <div class="w3-container w3-center w3-round-xlarge anger-color" style="width:50%">50%</div>
          </div>
          <br>
        </div>
      </div><br>
    </div>

    <!-- Right Column -->
    <div class="w3-twothird">
      <div class="w3-container w3-card w3-margin-bottom fear-color">
        <h2 class="white w3-padding-16"><i class="fa fa-suitcase fa-fw w3-margin-right w3-xxlarge joy-color"></i>Work Experience</h2>
        <div class="w3-container">
          <h5 class="white"><b>Front End Developer</b></h5>
          <h6 class="w3-container"><i class="fa fa-calendar fa-fw w3-margin-right"></i>Jan 2022 - <span class="w3-tag anger-color w3-round">Current</span></h6>
          <p>Still learning and exploring new things</p>
          <hr>
        </div>
      </div>
      <div class="w3-container w3-card sadness-color">
        <h2 class="w3-text-black w3-padding-16"><i class="fa fa-certificate fa-fw w3-margin-right w3-xxlarge"></i>Education</h2>
        <div class="w3-container">
          <h5 class="w3"><b>W3Schools.com</b></h5>
          <h6 class="sadness-color"><i class="fa fa-calendar fa-fw w3-margin-right"></i>Forever</h6>
          <p>Web Development! All I need to know in one place</p>
          <hr>
        </div>
        <div class="w3-container">
          <h5 class="white"><b>Polytechnic University of the Philippines - Sto. Tomas Campus</b></h5>
          <h6 class="sadness-color"><i class="fa fa-calendar fa-fw w3-margin-right"></i>2025 - 2028</h6>
          <p>Master Degree</p>
          <hr>
        </div>
        <div class="w3-container">
          <h5 class="white"><b>Polytechnic University of the Philippines - Sto. Tomas Campus</b></h5>
          <h6 class="sadness-color"><i class="fa fa-calendar fa-fw w3-margin-right"></i>2021 - 2025</h6>
          <p>Bachelor Degree</p><br>
        </div>
      </div>
    </div>
  </div>
</div>


<footer class="w3-container fear-color w3-center w3-margin-top">
  <p>Find me on social media.</p>
  <i class="fa fa-facebook-official w3-hover-opacity"></i>
  <i class="fa fa-instagram w3-hover-opacity"></i>
  <i class="fa fa-snapchat w3-hover-opacity"></i>
  <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
</footer>

</body>
</html>
<?php
// Close the database connection
$conn->close();
?>