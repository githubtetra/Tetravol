<nav class="navbar-vertical navbar">
    <div class="nav-scroller">
        <a class="navbar-brand" href="index.php">
            <h1 class="navbar-brand-text ms-3 mt-3 text-white">CCITUB</h1>
        </a>
        <ul class="navbar-nav flex-column" id="sideNavbar">
            <li class="nav-item">
                <div class="navbar-heading">Actividades</div>
            </li>

            <li class="nav-item">
                <a class="nav-link has-arrow" href="#pointNclick">
                    <i data-feather="search" class="nav-icon icon-xs me-2"></i>Benvinguts a l'any 2150
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link has-arrow" href="#microscopio">
                    <i data-feather="search" class="nav-icon icon-xs me-2"></i>Laboratori CCITUB
                </a>
            </li>

            <li class="nav-item">
                <a class="nav-link has-arrow" href="#naves">
                    <i data-feather="search" class="nav-icon icon-xs me-2" ></i>Viatge microspcòpic
                </a>
            </li>

            <li class="nav-item">
                <div class="navbar-heading">UTILIDADES</div>
            </li>

            <li class="nav-item">
                <a class="nav-link has-arrow" href="http://localhost/Tetraball">
                    <i data-feather="search" class="nav-icon icon-xs me-2"></i>Refrescar
                </a>
            </li>

            <?php
                if ($_SESSION['admin']) {
                    echo '
                    <li class="nav-item">
                        <div class="navbar-heading">Administración</div>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link has-arrow" href="staffs.php">
                            <i data-feather="settings" class="nav-icon icon-xs me-2"></i>Gestión de las cuentas
                        </a>
                    </li>
                    ';
                }
            ?>

        </ul>
    </div>
</nav>
