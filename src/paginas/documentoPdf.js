import {Document, Page, Text, View} from "@react-pdf/renderer";
import {format} from "date-fns";

const VistaPDF = ({datosPrestamo}) => {
    console.log(datosPrestamo);

    const alumnoApellidos = datosPrestamo.alumnoApellidos;
    const alumnoNombre = datosPrestamo.alumnoNombre;
    const estado_final = datosPrestamo.estado_final;
    const ubicacionMaterial = datosPrestamo.ubicacionMaterial;
    const estado_inicial = datosPrestamo.estado_inicial;
    let fecha_devolucion = ""
    const fechaActual = format(new Date(), 'yyyy-MM-dd');

    if (datosPrestamo.fecha_devolucion) {
        fecha_devolucion = format(new Date(datosPrestamo.fecha_devolucion), 'yyyy-MM-dd')
    }

    const nombreMaterial = datosPrestamo.nombreMaterial;
    const profesorApellidos = datosPrestamo.profesorApellidos;
    const profesorNombre = datosPrestamo.profesorNombre;
    const unidades = datosPrestamo.unidades;
    const utilidad = datosPrestamo.utilidad;


    return (
        <Document>
            <Page size="A4" style={{padding: 30}}>

                <View style={{ flexDirection: 'row', border: '1px solid black', padding: 5 }}>
                    <View style={{ width: '15%', textAlign: 'center' }}>
                    </View>
                    <View style={{ width: '35%', textAlign: 'center', borderRight: '1px solid black', borderLeft: '1px solid black' }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>I.E.S. ORETANIA Linares (Jaén)</Text>
                        <Text style={{ fontSize: 10 }}>Préstamo de material al alumnado</Text>
                        <Text style={{ fontSize: 10 }}>C.F.G.S</Text>
                    </View>
                    <View style={{ width: '35%', textAlign: 'center', borderRight: '1px solid black' }}>
                        <Text style={{ fontSize: 12 }}>Departamento de Informática y Comunicaciones</Text>
                        <Text style={{ fontSize: 10 }}>{fechaActual}</Text>
                        <Text style={{ fontSize: 10 }}>Página 1 de 1</Text>
                    </View>
                    <View style={{ width: '15%', textAlign: 'center' }}>
                        <Text style={{ fontSize: 10 }}>{fechaActual}</Text>
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
                        <Text style={{margin: 5, fontSize: 10, fontWeight: 'bold'}}>Conforme alumnado</Text>
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
                        <Text style={{margin: 10, fontSize: 10}}>{fecha_devolucion}</Text>
                    </View>
                    <View style={{width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}}>
                        <Text style={{margin: 10, fontSize: 10}}>{profesorNombre} {profesorApellidos}</Text>
                    </View>
                    <View style={{width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}}>
                        <Text style={{margin: 10, fontSize: 10}}>{estado_final}</Text>
                    </View>
                    <View style={{width: '25%', borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}}>
                        <Text style={{margin: 10, fontSize: 10}}>{ubicacionMaterial}</Text>
                    </View>
                </View>

            </Page>
        </Document>
    )
}

export default VistaPDF;