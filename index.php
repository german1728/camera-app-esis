<html lang=”en”>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<!-- Name of the app -->
		<title>Camera App</title>

		<!-- Link to main style sheet -->
		<link rel="stylesheet" href="style.css"> 
	</head>
	<body>

		<!-- Camera -->
		<main id="camera">

		    <!-- Camera sensor -->
		    <canvas id="camera--sensor"></canvas>
		    
		    <!-- Camera view -->
		    <video id="camera--view" autoplay playsinline></video>
		    
		    <!-- Camera output -->
		    <img src="//:0" alt="" id="camera--output">

		    <!-- Camera trigger -->
		    <button id="camera--trigger">Tomar una foto</button>

		</main>

		<!-- Reference to your JavaScript file -->
		<script src="app.js"></script> 
	</body>
</html>
