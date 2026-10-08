import{s as c}from"./index-C62RhVCc.js";import{p as u}from"./pdfPieces-BQdQnjuj.js";import{b as A,f as C,d as y,g as _,c as N,a as O,e as R}from"./pdfPieces-BQdQnjuj.js";import{f as g}from"./formalPdf-BGXfwg0s.js";import{b as E}from"./formalPdf-BGXfwg0s.js";const d={lengthMenu:"_MENU_ Entradas por página",search:"Buscar:",zeroRecords:"No hay registros para mostrar",info:"Mostrando del _START_ al _END_ de _TOTAL_ registros",infoFiltered:"(Filtrados de _MAX_ registros)",paginate:{first:'<i class="fas fa-angle-double-left"></i>',previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>',last:'<i class="fas fa-angle-double-right"></i>'}};function m(a,t){return{responsive:!1,serverSide:!0,processing:!0,ajax:(s,e)=>{const i=a.replace(/^\/api(?=\/)/,"");c.get(i,{params:s}).then(n=>e(n.data)).catch(()=>e({draw:s.draw,recordsTotal:0,recordsFiltered:0,data:[]}))},lengthMenu:[10,25,50,100],pageLength:10,dom:"frtip",language:d}}function x(a){return[{extend:"excelHtml5",text:'<i class="fa-solid fa-file-excel"></i> Excel',className:"btn btn-success",exportOptions:{columns:":not(:last-child)"}},{extend:"pdfHtml5",text:'<i class="fa-solid fa-file-pdf"></i> PDF',className:"btn btn-danger",exportOptions:{columns:":not(:last-child)"},customize:a},{extend:"print",text:'<i class="fa-solid fa-print"></i> Imprimir',className:"btn btn-dark"},{extend:"copy",text:'<i class="fa fa-solid fa-copy"></i> Copiar Tabla',className:"btn btn-light"}]}function v(a){return a===1?'<span style="color:var(--color-success);font-weight:bold">ACTIVO</span>':a===2?'<span style="color:var(--color-danger);font-weight:bold">INACTIVO</span>':a}function h(a,t,s=""){return`
        <div style="display:flex;gap:6px;justify-content:center;align-items:center;flex-wrap:nowrap;">
            <button title="Editar" class="btn btn-editar editar-btn" data-id="${t}">
                <i class="fa fa-pencil"></i>
            </button>
            <button title="${a===1?"Cambiar a Inactivo":"Cambiar a Activo"}" class="btn btn-borrar borrar-btn" data-id="${t}">
                ${a===1?'<i class="fa fa-solid fa-lock"></i>':'<i class="fa fa-solid fa-lock-open"></i>'}
            </button>
            ${s}
        </div>
    `}function $(a){return a===1?'<span class="dt-pill dt-pill-activo">ACTIVO</span>':a===2?'<span class="dt-pill dt-pill-inactivo">INACTIVO</span>':a}function k(a,t,s={}){const e=a===1,i=e?"fa-lock":"fa-lock-open",n=e?"dt-act-lock":"dt-act-unlock",o=e?"Cambiar a Inactivo":"Cambiar a Activo",r=s.ver?`<a title="Ver sensores" class="dt-act dt-act-ver sensores-btn" data-id="${t}" href="#"><i class="fa fa-eye"></i></a>`:"",l=s.info?`<a title="Ver información" class="dt-act dt-act-info info-btn" data-id="${t}" href="#"><i class="fa fa-circle-info"></i></a>`:"";return`
        <div class="dt-actions">
            ${r}
            ${l}
            <a title="Editar" class="dt-act dt-act-editar editar-btn" data-id="${t}" href="#"><i class="fa fa-pencil"></i></a>
            <a title="${o}" class="dt-act ${n} borrar-btn" data-id="${t}" href="#"><i class="fa fa-solid ${i}"></i></a>
        </div>
    `}export{h as actionRender,k as agroActionRender,$ as agroStatusRender,x as buildButtons,m as buildDtOptions,E as buildPdfCustomize,d as dtLanguage,g as formalPdf,A as pdfDivider,C as pdfFooter,y as pdfHeader,_ as pdfRunningHeader,N as pdfSignature,O as pdfStatRow,R as pdfStyles,u as preloadPdfAssets,v as statusRender};
