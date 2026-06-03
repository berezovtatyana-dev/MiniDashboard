import React, { useRef, useState, useEffect } from "react";

function AnaliticTable({data}){
    const tableContainerRef = useRef(null);
    const [showScrollTop, setShowScrollTop] = useState(false);

    //Храним ширину колонки, но обновлять будем только в момент mouseup
    const [colWidth, setColWidth] = useState({title: 400, amount: 110, category: 100, status: 100, date: 150});

    //рефы для отслеживания ресайза
    const resizeInfo = useRef(
        {
            isResizing: null,
            currentColumn: null,
            startX: 0,
            startWidth: 0,
            headerRef: null 
        }
    );

    //скролл наверх
    const handleScroll = () => {
        if (tableContainerRef.current){
            const scrollTop = tableContainerRef.current.scrollTop;
            setShowScrollTop(scrollTop > 200);
            //кнопка показывается, если прокрутка ниже 200px
        }
    };

    const scrollTop = () => {
        if(tableContainerRef.current){
            tableContainerRef.current.scrollTo({
                top: 0, behavior: 'smooth'
            });
        }
    };

    //логика Resize через useRef напрямую в DOM
    const handleMouseDown = (e, columnName, headerElement) => {
        e.preventDefault();
        resizeInfo.current = {
            isResizing: true,
            currentColumn: columnName,
            startX: e.clientX,
            startWidth: headerElement.offsetWidth,
            headerRef: headerElement
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };
    const handleMouseMove = (e) => {
        const info = resizeInfo.current;
        if (!info.isResizing) return;

        const deltaX = e.clientX - info.startX;
        const newWidth = Math.max(50, info.startWidth + deltaX);

        //прямое изменение DOM через UseRef без вызова setState
        if(info.headerRef){
            info.headerRef.style.width =`${newWidth}px`;
        }
    };

    const handleMouseUp = () => {
        const info = resizeInfo.current;
        if (info.isResizing && info.currentColumn){
            //только теперь фиксируем в State
            const finalWidth = info.headerRef ? info.headerRef.offsetWidth : info.startWidth;
            setColWidth(
                prev => ({
                    ...prev,
                    [info.currentColumn]: finalWidth
                }));
        }
        resizeInfo.current.isResizing = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    //очистка обработчиков при размонтировании
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, []);
    //Создаем ссылки на th (пойдут в mousedown)
    const thTitleRef = useRef(null);
    const thAmountRef = useRef(null);
    const thCategoryRef = useRef(null);
    const thStatusRef = useRef(null);

    //стиль для разделителя колонок

    const resizeStyle = {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '5px',
        cursor: 'col-resize',
        backgroundColor: '#ccc',
        userSelect: 'none'
    };
    return (
        <div style={{position: 'relative'}}>
            <div
            ref={tableContainerRef}
            onScroll={handleScroll}
            style={{maxHeight:'400px', overflowY: 'scroll', border:''}}>
                <table style={{tableLayout:'fixed', width:'100%', borderCollapse:'collapse'}}>
                    <thead>
                        <tr style={{position:'sticky', top:0, zIndex:1, backgroundColor:'gray'}}>
                            <th ref={thTitleRef} style={{width: colWidth.title, position: 'relative', border:'1px solid black'}}>
                                Название задачи
                                <div style={resizeStyle} onMouseDown={(e)=>handleMouseDown(e, 'title', thTitleRef.current)} />
                            </th>
                            <th ref={thAmountRef} style={{width: colWidth.amount, position: 'relative', border:'1px solid black'}}>
                                Сумма
                                <div style={resizeStyle} onMouseDown={(e)=>handleMouseDown(e, 'amount', thAmountRef.current)} />
                            </th>
                            <th ref={thCategoryRef} style={{width: colWidth.category, position: 'relative', border:'1px solid black'}}>
                                Категория
                                <div style={resizeStyle} onMouseDown={(e)=>handleMouseDown(e, 'category', thCategoryRef.current)} />
                            </th>
                            <th ref={thStatusRef} style={{width: colWidth.status, position: 'relative', border:'1px solid black'}}>
                                Статус
                                <div style={resizeStyle} onMouseDown={(e)=>handleMouseDown(e, 'status', thStatusRef.current)} />
                            </th>
                            <th style={{width: colWidth.status, position: 'relative', border:'1px solid black'}}>
                                Дата
                                <div />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} style={{borderBottom: '2px solid #eee'}}>
                                <td style={{overflow:'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap'}}>{item.title}</td>
                                <td>{item.amount}</td>
                                <td>{item.category}</td>
                                <td>{item.status}</td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
            {showScrollTop &&(
            <button onClick={scrollToTop} style={{position:'absolute', bottom:'20px', right:'20px', zIndex:10, cursor:'pointer'}}>
                Наверх
            </button>
            )}
        </div>
    )

}
export default AnaliticTable;