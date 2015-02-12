/*
 * File: app/view/MatrixEx6ViewController.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('CalendarMatrix.view.MatrixEx6ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.matrixex6',

    createWindow: function(x,y, rangeSelectMode) {
        var me = this;

        myWindow = Ext.create('Ext.window.Window', {
            width: 487,
            maxWidth: 487,
            height: 282,
            cls: 'matrix-ex6-cal',
            style: 'padding: 4px;',
            itemId: 'calendarPopupWindow',
            header: false
        });


        me.getView().myWindow = myWindow;

        var today= Ext.Date.clearTime(new Date(Date(Ext.Date.now())), true);

        var cal = Ext.create('Ext.ux.CalendarMatrix.CalendarMatrix', {
            numRows: 1,
            numCols: 2,
            matrixMode: 'RANGE',
            matrixDisabled: false,
            rangeSelectMode: rangeSelectMode,
            cls: 'matrix-cal',
            itemId: 'matrixEx6Cal',
            reference: 'matrixEx6Cal',
            monthTextFn: function(myDate){return Ext.Date.format(myDate, 'M').toUpperCase()+' '+Ext.Date.format(myDate, 'Y');},
            disableFn: function(cellDate, matrixCont){
                // When selecting enddates, disable dates prior to start date.  when selecting start dates, disable prior to today
                var today= Ext.Date.clearTime(new Date(Date(Ext.Date.now())), true);
                var retRangeSelectMode =  matrixCont.getRangeSelectMode();
                if (retRangeSelectMode === 'startdate' && !Ext.isEmpty(matrixCont.rangeDt2)){
                    return (cellDate < today || cellDate > matrixCont.rangeDate2);
                }
                if (retRangeSelectMode === 'startdate' || Ext.isEmpty(matrixCont.rangeDt1)){
                    return (cellDate < today);
                }
                return (cellDate < matrixCont.rangeDate1);
            }

        });

        cal.mon(cal, 'calendarselect', me.handleSelect, me);
        cal.mon(cal, 'mouseover', me.onCalendarMouseOver, me);


        // Proceed to remove default month navigation toolbar and add custom arrows
        var toolbar = cal.down('#calGridToolBar');
        cal.remove(toolbar, true);

        var priorBtn = Ext.create('Ext.button.Button',{
            ui: 'plain',
            iconCls: 'fa-icon-chevron-sign-left',
            text: '',
            style: 'z-index: 200; position: absolute;',
            x: 10,
            y: 25,
            height: 40,
            width: 40,
            hidden: true, // initialize as hidden as days prior to today are disabled
            itemId: 'priorCalGridMatrix',
            reference: 'priorCalGridMatrix',
            listeners: {
                scope: me,
                click: 'onMyPriorCalGridMatrixClick'
            }
        });

        cal.add(priorBtn);

        var nextBtn = Ext.create('Ext.button.Button',{
            ui: 'plain',
            iconCls: 'fa-icon-chevron-sign-right',
            text: '',
            style: 'z-index: 200; position: absolute; ',
            x: 420,
            y: 25,
            height: 40,
            width: 40,
            itemId: 'nextCalGridMatrix',
            reference: 'nextCalGridMatrix',
            cls: 'cal-grid-next-btn',
            listeners: {
                scope: me,
                click: 'onMyNextCalGridMatrixClick'
            }
        });

        cal.add(nextBtn);

        myWindow.add(cal);

        myWindow.showAt(x, y, {duration: 100});


    },

    handleSelect: function(calendarMatrix, selDt, selDate, selVal) {
        var me=this,
            rangeDt1, rangeDt2, rangeDate1_fmt, rangeDate2_fmt,
            rangeSelectMode = calendarMatrix.getRangeSelectMode(),
            myWindow = me.getView().myWindow,
            startMonthIdx =  calendarMatrix.getStartMonthIdx();

        rangeDt1 = calendarMatrix.rangeDt1;
        rangeDt2 = calendarMatrix.rangeDt2;
        rangeDate1_fmt = Ext.Date.format(calendarMatrix.rangeDate1, 'm/d/Y');
        rangeDate2_fmt = Ext.Date.format(calendarMatrix.rangeDate2, 'm/d/Y');

        me.lookupReference('startBtn').setText(rangeDate1_fmt);
        me.lookupReference('endBtn').setText(rangeDate2_fmt);

        if (rangeSelectMode==='startdate' && Ext.isEmpty(rangeDt2)){
            // auto-select end date button and redisplay calendar to accept end date
            me.onEndBtnClick(me.lookupReference('endBtn'));
            myWindow.down('#priorCalGridMatrix').setVisible(false);
        }
        if (rangeSelectMode==='enddate' && Ext.isEmpty(rangeDt1)){
            // auto-select start date button and redisplay calendar to accept start date
            me.onStartBtnClick(me.lookupReference('startBtn'));
        }
        if (!Ext.isEmpty(rangeDt1) && !Ext.isEmpty(rangeDt2)){
            myWindow.setHidden(true);
        }
    },

    onCalendarMouseOver: function(matrix, selDate) {
        var me=this, i, matrixItem, calendarMatrix = matrix.matrixCont,
             rangeSelectMode = calendarMatrix.getRangeSelectMode(),
             selDt = Ext.Date.format(selDate, 'Y-m-d');


        if ((rangeSelectMode==='startdate' && Ext.isEmpty(calendarMatrix.rangeDt2)) ||
            (rangeSelectMode==='enddate'   && Ext.isEmpty(calendarMatrix.rangeDt1)) ||
            (rangeSelectMode==='enddate'   && selDt === calendarMatrix.rangeDt1)  ||
            (rangeSelectMode==='startdate' && selDt === calendarMatrix.rangeDt2)
           ){
            return;
        }

        if (rangeSelectMode==='enddate'){
            calendarMatrix.rangeDate2 = selDate;
            calendarMatrix.rangeDt2 = Ext.Date.format(selDate, 'Y-m-d');
        }
        else {
            calendarMatrix.rangeDate1 = selDate;
            calendarMatrix.rangeDt1 = Ext.Date.format(selDate, 'Y-m-d');
        }

        // refresh all matrix calendars based on selected range
        for (i=0; i<calendarMatrix.matrix.length; i++){
            matrixItem = calendarMatrix.down('#'+calendarMatrix.matrix[i].itemId+'_mc');
            matrixItem.fullUpdate(selDate);
        }
    },

    onMyPriorCalGridMatrixClick: function(button, e, eOpts) {
        this.handleMonthNav(-1);
    },

    onMyNextCalGridMatrixClick: function(button, e, eOpts) {
        this.handleMonthNav(1);
    },

    handleMonthNav: function(multiplier) {
        var me = this,
            myWindow = me.getView().myWindow,
            calendarMatrix = myWindow.down('#matrixEx6Cal'),
            startMonthIdx, lastMatrixItem,
            rangeSelectMode = calendarMatrix.getRangeSelectMode();

        calendarMatrix.setStartMonthIdx(calendarMatrix.getStartMonthIdx() + (multiplier* calendarMatrix.numMonths));
        calendarMatrix.dispCalGrid();

        startMonthIdx =  calendarMatrix.getStartMonthIdx();
        lastMatrixItem = calendarMatrix.down('#'+calendarMatrix.matrix[calendarMatrix.matrix.length-1].itemId+'_mc');

        // Handle hide/show of next/prev month icons
        myWindow.down('#priorCalGridMatrix').setVisible(true);
        myWindow.down('#nextCalGridMatrix').setVisible(true);
        if (startMonthIdx === 0) {
            myWindow.down('#priorCalGridMatrix').setVisible(false);
        }
        if (rangeSelectMode==='startdate' && !Ext.isEmpty(calendarMatrix.rangeDt2) &&
            calendarMatrix.rangeDate2 < lastMatrixItem.maxDate){
              myWindow.down('#nextCalGridMatrix').setVisible(false);
        }
    },

    onStartBtnClick: function(button, e, eOpts) {
        var me = this, el,  y, myWindow, calendarMatrix, lastMatrixItem, rangeSelectMode;

        button.addCls('date-input-selected');
        this.lookupReference('endBtn').removeCls('date-input-selected');

        el = button.getEl();
        y = el.getY()+el.getHeight()+10;

        myWindow = me.getView().myWindow;
        if (!myWindow){
            me.createWindow(15, y, 'startdate');
        }
        else {
            calendarMatrix = myWindow.down('#matrixEx6Cal');
            calendarMatrix.setRangeSelectMode('startdate');
            calendarMatrix.dispCalGrid();
            myWindow.showAt(15, y, {duration: 10});

            // Hide prior/next buttons if user shouldn't be navigating
            lastMatrixItem = calendarMatrix.down('#'+calendarMatrix.matrix[calendarMatrix.matrix.length-1].itemId+'_mc');
            rangeSelectMode = calendarMatrix.getRangeSelectMode();
            myWindow.down('#priorCalGridMatrix').setVisible(calendarMatrix.getStartMonthIdx()>0);
            myWindow.down('#nextCalGridMatrix').setVisible(true);
            if (rangeSelectMode==='startdate' && !Ext.isEmpty(calendarMatrix.rangeDt2) &&
            calendarMatrix.rangeDate2 < lastMatrixItem.maxDate){
                myWindow.down('#nextCalGridMatrix').setVisible(false);
            }
        }
    },

    onEndBtnClick: function(button, e, eOpts) {
        var me = this, el,  y, myWindow, calendarMatrix, firstMatrixItem;

        button.addCls('date-input-selected');
        this.lookupReference('startBtn').removeCls('date-input-selected');

        el = button.getEl();
        y = el.getY()+el.getHeight()+10;

        myWindow = me.getView().myWindow;
        if (!myWindow){
            me.createWindow(170, y, 'enddate');
        }
        else {
            calendarMatrix = myWindow.down('#matrixEx6Cal');
            calendarMatrix.setRangeSelectMode('enddate');
            calendarMatrix.dispCalGrid();
            myWindow.showAt(170, y, {duration: 10});

            // Hide prior/next buttons if user shouldn't be navigating
            firstMatrixItem = calendarMatrix.down('#'+calendarMatrix.matrix[0].itemId+'_mc');
            rangeSelectMode = calendarMatrix.getRangeSelectMode();
            myWindow.down('#priorCalGridMatrix').setVisible(true);
            myWindow.down('#nextCalGridMatrix').setVisible(true);
            if (rangeSelectMode==='enddate' && !Ext.isEmpty(calendarMatrix.rangeDt1) &&
            calendarMatrix.rangeDate1 >= firstMatrixItem.minDate){
                myWindow.down('#priorCalGridMatrix').setVisible(false);
            }
        }


    },

    onResetBtnClick: function(button, e, eOpts) {
        var me = this,
            view = me.getView(),
            myWindow = view.myWindow;

        if (myWindow) {
            Ext.destroy(myWindow);
            view.myWindow = undefined;
        }
        view.down('#endBtn').setText('mm/dd/yyyy');
        view.down('#startBtn').setText('mm/dd/yyyy');

    },

    onFindBtnClick: function(button, e, eOpts) {
        var me = this;

        var myWindow = me.getView().myWindow;
        if (myWindow) {
            var matrix = myWindow.down('#matrixEx6Cal');
            console.log('matrixEx6Cal: startDt='+matrix.rangeDt1+', endDt='+matrix.rangeDt2);

            myWindow.setVisible(false);
        }
    }

});