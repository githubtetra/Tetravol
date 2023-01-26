<nav class="navbar-dark bg-dark navbar navbar-expand-lg">
    <a id="nav-toggle" href="#"><i data-feather="menu" class="nav-icon me-2 icon-xs"></i></a>
    <ul class="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
        <li class="dropdown ms-2">
            <a class="rounded-circle" href="#" role="button" id="dropdownUser" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="avatar avatar-md avatar-indicators avatar-online">
                    <!-- <img alt="avatar" src="https://avatars.githubusercontent.com/u/118271519?v=4" class="rounded-circle" /> -->
                    <img alt="avatar" src="https://i.imgur.com/BmK6vCP.png" class="rounded-circle" />
                </div>
            </a>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUser">
                <div class="px-4 pb-0 pt-2">
                    <div class="lh-1 ">
                        <h5 class="mb-1"><?php echo $_SESSION['username']?></h5>
                        <h6 class="mb-1"><b><?php echo $_SESSION['rol_label']; ?></b></h6>
                    </div>
                    <div class="dropdown-divider mt-2"></div>
                </div>

                <ul class="list-unstyled">
                    <li>
                        <a class="dropdown-item" href="libs/cerrar-sesion.php">
                            <i class="me-2 icon-xxs dropdown-item-icon" data-feather="power"></i>Cerrar Sesion
                        </a>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</nav>