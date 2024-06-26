export const NOMBREAPP = "Orerecursos Compartidos"
export const BASEAPI = window.innerWidth <= 768
    ? 'http://192.168.100.154:9000'
    : 'http://localhost:9000';

const localeText = {
    noRowsLabel: 'No hay filas',
    noResultsOverlayLabel: 'No se encontraron resultados.',
    errorOverlayDefaultLabel: 'Se produjo un error.',
    toolbarDensity: 'Densidad',
    toolbarDensityLabel: 'Densidad',
    toolbarDensityCompact: 'Compacto',
    toolbarDensityStandard: 'Estándar',
    toolbarDensityComfortable: 'Cómodo',
    toolbarColumns: 'Columnas',
    toolbarColumnsLabel: 'Seleccionar columnas',
    toolbarFilters: 'Filtros',
    toolbarFiltersLabel: 'Mostrar filtros',
    toolbarFiltersTooltipHide: 'Ocultar filtros',
    toolbarFiltersTooltipShow: 'Mostrar filtros',
    toolbarFiltersTooltipActive: count => count !== 1 ? `${count} filtros activos` : `${count} filtro activo`,
    toolbarQuickFilterPlaceholder: 'Buscar…',
    toolbarQuickFilterLabel: 'Buscar',
    toolbarQuickFilterDeleteIconLabel: 'Limpiar',
    columnMenuLabel: 'Menú',
    columnMenuShowColumns: 'Mostrar columnas',
    columnMenuFilter: 'Filtrar',
    columnMenuHideColumn: 'Ocultar',
    columnMenuUnsort: 'Desordenar',
    columnMenuSortAsc: 'Orden ascendente',
    columnMenuSortDesc: 'Orden descendente',
    footerRowSelected: count => count !== 1 ? `${count.toLocaleString()} filas seleccionadas` : `${count.toLocaleString()} fila seleccionada`,
    footerTotalRows: 'Total de filas:',
    footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
    checkboxSelectionHeaderName: 'Selección',
    booleanCellTrueLabel: 'verdadero',
    booleanCellFalseLabel: 'falso',
    actionsCellMore: 'más',
    footerPaginationRowsPerPage: 'Filas por página:',
    footerPaginationRowRange: (start, end, total) => `${start} - ${end} de ${total}`,
};

export default localeText