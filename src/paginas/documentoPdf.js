import {Document, Page, Text, View} from "@react-pdf/renderer";

const VistaPDF = ({datosPrestamo}) => {
    console.log(datosPrestamo);

    const alumnoApellidos = datosPrestamo.alumnoApellidos;
    const alumnoNombre = datosPrestamo.alumnoNombre;
    const descripcionMaterial = datosPrestamo.descripcionMaterial;
    const devuelto = datosPrestamo.devuelto;
    const estado_final = datosPrestamo.estado_final;
    const estado_inicial = datosPrestamo.estado_inicial;
    const fecha_devolucion = datosPrestamo.fecha_devolucion;
    const fecha_inicio = datosPrestamo.fecha_inicio;
    const id = datosPrestamo.id;
    const nombreMaterial = datosPrestamo.nombreMaterial;
    const precioMaterial = datosPrestamo.precioMaterial;
    const profesorApellidos = datosPrestamo.profesorApellidos;
    const profesorNombre = datosPrestamo.profesorNombre;
    const unidades = datosPrestamo.unidades;
    const utilidad = datosPrestamo.utilidad;


    return (
        <Document>
            <Page size="A4" style={{padding: 30}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '100%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: '#eee',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 5, fontSize: 18, fontWeight: 'bold'}}>Préstamo de {nombreMaterial} a {alumnoNombre} {alumnoApellidos}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '20%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: '#eee',
                        textAlign: 'right'  
                    }}>
                        <Text style={{margin: 5, fontSize: 10, fontWeight: 'bold'}}>Profesorado que lo entrega</Text>
                    </View>
                    <View style={{
                        width: '80%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 10, fontSize: 10}}>{profesorNombre} {profesorApellidos}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '20%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: '#eee',
                        textAlign: 'right'  
                    }}>
                        <Text style={{margin: 5, fontSize: 10, fontWeight: 'bold'}}>Alumnado que lo recibe</Text>
                    </View>
                    <View style={{
                        width: '80%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 10, fontSize: 10}}>{alumnoNombre} {alumnoApellidos}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '20%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: '#eee',
                        textAlign: 'right'  
                    }}>
                        <Text style={{margin: 5, fontSize: 10, fontWeight: 'bold'}}>Fecha de entrega</Text>
                    </View>
                    <View style={{
                        width: '80%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 10, fontSize: 10}}>{fecha_devolucion}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '20%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: '#eee',
                        textAlign: 'right'  
                    }}>
                        <Text style={{margin: 5, fontSize: 10, fontWeight: 'bold'}}>Utilidad del proyecto asociado</Text>
                    </View>
                    <View style={{
                        width: '80%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 10, fontSize: 10}}>{utilidad}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '20%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: '#eee',
                        textAlign: 'right'  
                    }}>
                        <Text style={{margin: 5, fontSize: 10, fontWeight: 'bold'}}>Material prestado</Text>
                    </View>
                    <View style={{
                        width: '80%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 10, fontSize: 10}}>{nombreMaterial}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '20%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: '#eee',
                        textAlign: 'right'  
                    }}>
                        <Text style={{margin: 5, fontSize: 10, fontWeight: 'bold'}}>Unidades</Text>
                    </View>
                    <View style={{
                        width: '80%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 10, fontSize: 10}}>{unidades}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '20%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: '#eee',
                        textAlign: 'right'  
                    }}>
                        <Text style={{margin: 5, fontSize: 10, fontWeight: 'bold'}}>Estado antes de la entrega</Text>
                    </View>
                    <View style={{
                        width: '80%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 10, fontSize: 10}}>{estado_inicial}</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '20%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: '#eee',
                        textAlign: 'right'  
                    }}>
                        <Text style={{margin: 5, fontSize: 10, fontWeight: 'bold'}}>Información adicional</Text>
                    </View>
                    <View style={{
                        width: '80%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 10, fontSize: 10}}></Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '20%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: '#eee',
                        textAlign: 'right'  
                    }}>
                        <Text style={{margin: 5, fontSize: 10, fontWeight: 'bold'}}>Conforma alumnado</Text>
                    </View>
                    <View style={{
                        width: '80%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 10, fontSize: 10}}></Text>
                    </View>
                </View>


                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '100%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        backgroundColor: '#eee',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 5, fontSize: 10, fontWeight: 'bold'}}>Devolución</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: '25%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 5, fontSize: 10}}>Fecha</Text>
                    </View>
                    <View style={{
                        width: '25%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 5, fontSize: 10}}>Profesorado</Text>
                    </View>
                    <View style={{
                        width: '25%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 5, fontSize: 10}}>Estado de la devolución</Text>
                    </View>
                    <View style={{
                        width: '25%',
                        borderStyle: 'solid',
                        borderWidth: 1,
                        borderColor: '#000',
                        textAlign: 'center'
                    }}>
                        <Text style={{margin: 5, fontSize: 10}}>Lugar dónde se guarda</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}}>
                        <Text style={{margin: 10, fontSize: 10}}></Text>
                    </View>
                    <View style={{width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}}>
                        <Text style={{margin: 10, fontSize: 10}}>{profesorNombre} {profesorApellidos}</Text>
                    </View>
                    <View style={{width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}}>
                        <Text style={{margin: 10, fontSize: 10}}>{estado_final}</Text>
                    </View>
                    <View style={{width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}}>
                        <Text style={{margin: 10, fontSize: 10}}>{}</Text>
                    </View>
                </View>

            </Page>
        </Document>
    )
}

export default VistaPDF;