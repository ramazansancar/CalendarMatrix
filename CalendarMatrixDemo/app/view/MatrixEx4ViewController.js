/*
 * File: app/view/MatrixEx4ViewController.js
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

Ext.define('CalendarMatrix.view.MatrixEx4ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.matrixex4',

    createWindow: function(x,y, rangeSelectMode) {
        var me = this;

        myWindow = Ext.create('Ext.window.Window', {
            width: 432,
            height: 210,
            cls: 'matrix-ex4-cal',
            style: 'padding: 4px;',
            itemId: 'calendarPopupWindow',
            header: false
        });


        me.getView().myWindow = myWindow;

        var cal = Ext.create('Ext.ux.CalendarMatrix.CalendarMatrix', {
            numRows: 1,
            numCols: 2,
            matrixMode: 'RANGE',
            matrixDisabled: false,
            rangeSelectMode: rangeSelectMode,
            cls: 'matrix-cal',
            itemId: 'matrixEx4Cal',
            reference: 'matrixEx4Cal'
        });

        cal.mon(cal, 'calendarselect', me.handleSelect, me);


        // Proceed to remove default month navigation toolbar and add custom arrows
        var toolbar = cal.down('#calGridToolBar');
        cal.remove(toolbar, true);

        var priorBtn = Ext.create('Ext.button.Button',{
            ui: 'plain',
            iconCls: 'cal-grid-prior-btn',
            text: '',
            style: 'z-index: 200; position: absolute;',
            x: -30,
            y: 3,
            itemId: 'priorCalGridMatrix',
            reference: 'priorCalGridMatrix',
            listeners: {
                click: 'onPriorCalGridMatrixClick'
            }
        });

        cal.add(priorBtn);

        var nextBtn = Ext.create('Ext.button.Button',{
            ui: 'plain',
            iconCls: 'cal-grid-next-btn',
            text: '',
            style: 'z-index: 200; position: absolute; ',
            x: 385,
            y: 3,
            itemId: 'nextCalGridMatrix',
            reference: 'nextCalGridMatrix',
            cls: 'cal-grid-next-btn',
            listeners: {
                click: 'onNextCalGridMatrixClick'
            }
        });

        cal.add(nextBtn);

        myWindow.add(cal);

        myWindow.showAt(x, y, {duration: 100});


    },

    handleSelect: function(calendarMatrix, selDt, selDate, selVal) {
        var me=this,
            rangeDt1 = calendarMatrix.rangeDt1,
            rangeDate1_fmt = Ext.Date.format(calendarMatrix.rangeDate1, 'm/d/Y'),
            rangeDt2 = calendarMatrix.rangeDt2,
            rangeDate2_fmt = Ext.Date.format(calendarMatrix.rangeDate2, 'm/d/Y'),
            rangeSelectMode = calendarMatrix.getRangeSelectMode();

        if (rangeSelectMode==='startdate'){
            me.lookupReference('startBtn').setText(rangeDate1_fmt);
            if (Ext.isEmpty(rangeDt2)){
                // auto-select end date button and redisplay calendar to accept end date
                me.onEndBtnClick(me.lookupReference('endBtn'));
            }
        }
        else if (rangeSelectMode==='enddate'){
            me.lookupReference('endBtn').setText(rangeDate2_fmt);
            if (Ext.isEmpty(rangeDt1)){
                // auto-select start date button and redisplay calendar to accept start date
                me.onStartBtnClick(me.lookupReference('startBtn'));
            }
        }
    },

    onStartBtnClick: function(button, e, eOpts) {
        var me = this;

        button.addCls('date-input-selected');
        this.lookupReference('endBtn').removeCls('date-input-selected');
        var el = button.getEl();
        var y = el.getY()+el.getHeight()+10;

        var myWindow = me.getView().myWindow;
        if (!myWindow){
            me.createWindow(20, y, 'startdate');
        }
        else {
            myWindow.down('#matrixEx4Cal').setRangeSelectMode('startdate');
            myWindow.showAt(20, y, {duration: 100});
        }
    },

    onEndBtnClick: function(button, e, eOpts) {
        var me = this;

        button.addCls('date-input-selected');
        this.lookupReference('startBtn').removeCls('date-input-selected');
        var el = button.getEl();
        var y = el.getY()+el.getHeight()+10;

        var myWindow = me.getView().myWindow;
        if (!myWindow){
            me.createWindow(160, y, 'enddate');
        }
        else {
            myWindow.down('#matrixEx4Cal').setRangeSelectMode('enddate');
            myWindow.showAt(160, y, {duration: 100});
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
            var matrix = myWindow.down('#matrixEx4Cal');
            console.log('matrixEx4Cal: startDt='+matrix.rangeDt1+', endDt='+matrix.rangeDt2);

            myWindow.setVisible(false);
        }
    }

});
