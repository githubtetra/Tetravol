<?php 
    require_once "libs/dbauth.php"; 
    include_once "utils/config.php";

	$idAccount = $_GET["id"];

    session_start();
	if (!isset($_SESSION['username'])) {
		header("Location: login.php?redirect=staff.php?id=".$idAccount);
		session_destroy();
	}

	$infoAccount = MySql_Select("SELECT * FROM panel_users WHERE id = '".$idAccount."'");

	if ($infoAccount) { 
		$infoAccount = mysqli_fetch_array($infoAccount); 
	} else {
		header("Location: staffs.php");
	}

	function deleteAccount($id) {
		$delete = MySql_Execute("DELETE FROM panel_users WHERE id = '".$id."'");
		if ($delete) {
			header("Location: staffs.php");
		} else {
			echo "Error al eliminar la cuenta";
		}
	}
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>CCITUB | <?php echo $infoAccount["username"]; ?></title>
		<?php include_once("utils/head.php") ?>
	</head>

	<body>
		<div id="db-wrapper">
			<?php include_once("utils/navs/navbar-v.php") ?>
			<div id="page-content">
				<div class="header @@classList">
					<?php include_once("utils/navs/navbar-h.php") ?>
				</div>
				<div class="container-fluid px-6 py-4">
					<div class="row align-items-center">
						<div class="col-xl-12 col-lg-12 col-md-12 col-12">
							<div class="pt-20 rounded-top" style="background: url(./assets/images/background/profile-cover.jpg) no-repeat; background-size: cover;"> </div>
							<div class="bg-dark rounded-bottom smooth-shadow-sm">
								<div class="d-flex align-items-center justify-content-between flex-wrap pt-4 pb-2 px-3">
									<div class="d-flex align-items-center mx-1"> 
										<div class="lh-1">
											<h2 class="mb-2 text-gray-500"><?php echo $infoAccount["username"]; ?></h2>
										</div>
									</div>
									<div class="d-flex flex-wrap">
										<div class="lh-1">
											<ul class="nav mb-1">
												<li class="nav-item mb-2">
                                                    <a href="#" id='reiniciarcuenta' data-idAccount="<?php echo $idAccount; ?>" class="btn btn-dark-info text-white mx-1">Reiniciar progreso</a> 
													<a href="#" id='eliminarCuenta' data-idstaff="<?php echo $idAccount; ?>" class="btn btn-dark-danger text-white mx-1">Eliminar Cuenta</a> 
												</li>
											</ul>
										</div>
									</div>
								</div>

								<ul class="nav nav-lt-tab px-4" id="pills-tab" role="tablist">
									<li class="nav-item">
										<a class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Información general</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div class="py-6">
						<div class="tab-content" id="pills-tabContent">
							<div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
								<div class="row">
									<div class="col-xl-12 col-lg-12 col-md-12 col-12 mb-6">
										<div class="card bg-dark">
											<div class="card-body">
												<h4 class="text-uppercase card-title text-gray-500 mb-4">Información general</h4>
												<div class="row">
													<div class="col-6 mb-5">
														<h6 class="text-uppercase fs-5 ls-2 text-gray-500">Nombre</h6>
														<p class="mb-0">
															<?php 
																if (!empty($infoAccount["username"])) {
																	echo "<span class='badge bg-dark-success'>".$infoAccount["username"]."</span>";
																} else {
																	echo "<span class=\"badge bg-dark-secondary\">N/A</span>";
																}
															?>
														</p>
													</div>

                                                    <div class="col-6 mb-5">
														<h6 class="text-uppercase fs-5 ls-2 text-gray-500">Rango</h6>
														<p class="mb-0">
															<?php 
																if (!empty($infoAccount["rol"])) {
																	echo "<span class='badge bg-dark-success'>".$infoAccount["rol"]."</span>";
																} else {
																	echo "<span class=\"badge bg-dark-secondary\">N/A</span>";
																}
															?>
														</p>
													</div>

                                                    <div class="col-6 mb-5">
														<h6 class="text-uppercase fs-5 ls-2 text-gray-500">Rango</h6>
														<p class="mb-0">
															<?php 
																if (!empty($infoAccount["psswd"])) {
																	echo "<span class='badge bg-dark-success'>".$infoAccount["psswd"]."</span>";
																} else {
																	echo "<span class=\"badge bg-dark-secondary\">N/A</span>";
																}
															?>
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>	
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php include_once("utils/scripts.php") ?>
		<script src="assets/js/staff.js"></script>
	</body>
</html>