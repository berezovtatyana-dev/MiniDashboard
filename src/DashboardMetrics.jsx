import React, {useMemo} from "react";

function DashboardMetrics({filteredData}){
    const metrics = useMemo(() =>{
        if (filteredData.length === 0){
            console.log('Начало фильтрации');
            return {totalAmount: 0, avgAmount: 0, successRate: 0};
        }

        const totalAmount = filteredData.reduce((sum, item)=>sum+item.amount, 0);
        const avgAmount = Math.round(totalAmount/filteredData.length);
        const completedCount = filteredData.filter(item=>item.status==='Выполнено').length
        const successRate = Math.round((completedCount/filteredData.length)*100);

        return {totalAmount, avgAmount, successRate};
    }, [filteredData]);

    return (
        <div style={{display: 'flex', gap: '20px'}}>
            <div style={{border: '1px solid #666'}}>
                <h3>Общая сумма</h3>
                <p>{metrics.totalAmount.toLocaleString()}р.</p>
            </div>
            <div style={{border: '2px solid #668'}}>
                <h3>Средний чек</h3>
                <p>{metrics.avgAmount.toLocaleString()}р.</p>
            </div>
            <div style={{border: '3px solid #664'}}>
                <h3>Процент выполнения</h3>
                <p>{metrics.successRate}</p>
            </div>
        </div>
    );
}
export default DashboardMetrics;