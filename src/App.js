import React, { useState, useEffect } from 'reactn';

import logo from './logo.svg';
import './App.css';

import { Button, DataGrid, Popup, Template, Form } from 'devextreme-react';
import { Item, SimpleItem } from 'devextreme-react/form';
import { Column, Paging, Editing, LoadPanel } from 'devextreme-react/data-grid';
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';

const App = (props) => {

  const storeVazia = new ArrayStore({ key: "oid", data: [] });

  const currentData = { pagarValeTransporteEmFolha: true };

  const [dataSourceFeriados, setDataSourceFeriados] = useState(storeVazia);

  const newRecord = false;

  const handleOnClickSalvar = (e) => { console.log(e); }
  const handleOnClickCancelar = (e) => { console.log(e); }

  const storeFeriados = new CustomStore({
    key: "oid",
    load: async () => {
      const dados = [{ oid: 1, data: '10/09/2019', nome: 'Feriado1' }];
      return (dados);
    }
  });
  
  useEffect(() => {

    setDataSourceFeriados(storeFeriados);

  }, []);

  return (
    <div className="App">
      <Popup visible={true} dragEnabled={false} closeOnOutsideClick={false} title={'Teste'} showCloseButton={false} showTitle={true} width={500} height={400}>
        <Form formData={currentData} repaintChangesOnly={true}  colCount={1}>

          <SimpleItem dataField={'pagarValeTransporteEmFolha'} editorType={'dxCheckBox'} label={ {text: '', visible: false}} editorOptions={{ disabled: false, text: 'Pagar VT Em Folha' }} visible={newRecord} />

        </Form>

        &nbsp;

        <DataGrid dataSource={dataSourceFeriados} allowColumnReordering={true} showBorders={true} >

          <Paging defaultPageSize={5} />
          <Editing mode={'row'} useIcons={true} allowUpdating={true} allowDeleting={true} />
          <LoadPanel enabled={true} />

          <Column type={'buttons'} width={100} buttons={['edit', 'delete']} />
          <Column dataField={'oid'} visible={false} />
          <Column dataField={'data'} caption={'Data'} dataType={'date'} format={'dd/MM/yyyy'} sortIndex={0} sortOrder={'asc'} width={'120px'} />
          <Column dataField={'nome'} caption={'Nome'} />
        </DataGrid>

      </Popup>
    </div>
  );
}

export default App;
