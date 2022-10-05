
 <!DOCTYPE html>
<html>
<head>
	<title>Inicio</title>
	<?php require_once "scripts.php"; ?>
</head>
<body>
<br><br><br>
	<div class="container">
		<?php echo($_SESSION['user']); ?>
		<div class="row">
			<div class="col-sm-12">
				<div class="jumbotron">
				<a href="salir.php" class="btn btn-info">Salir del sistema</a>
					<h2>Entraste con exito</h2>
				</div>
			</div>
		</div>
	</div>
</body>
</html>

<!---
} else {
	header("location:login.html");
	}
 ?>

--->
