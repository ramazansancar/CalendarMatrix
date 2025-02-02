/*
 * File: app/view/MatrixEx4.js
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

Ext.define('CalendarMatrix.view.MatrixEx4', {
    extend: 'Ext.container.Container',
    alias: 'widget.matrixex4',

    requires: [
        'CalendarMatrix.view.MatrixEx4ViewModel',
        'CalendarMatrix.view.MatrixEx4ViewController',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    controller: 'matrixex4',
    viewModel: {
        type: 'matrixex4'
    },
    cls: 'matrix-ex4-cal',
    itemId: 'matrixEx4',
    margin: 5,
    style: 'background-color: white;',
    layout: 'border',

    items: [
        {
            xtype: 'container',
            region: 'north',
            html: 'TripAdvisor style date range selector. Also demonstrates the following:<br>  - Customized month navigation arrows<br>  - Displays calendar in popup window that repositions based in startDate/endDate selection mode.  Utilizes rangeSelectMode config.<br> - Custom styling of startDate and endDate.',
            style: 'margin: 20px 0; font-size: 18px;'
        },
        {
            xtype: 'toolbar',
            region: 'north',
            height: 60,
            items: [
                {
                    xtype: 'button',
                    reference: 'startBtn',
                    height: 45,
                    itemId: 'startBtn',
                    style: 'font-size: 16px; padding-top: 15px; border: 1px solid #eee;',
                    ui: 'plain',
                    width: 130,
                    iconAlign: 'right',
                    iconCls: 'calendar-img',
                    text: 'mm/dd/yyyy',
                    listeners: {
                        click: 'onStartBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    reference: 'endBtn',
                    height: 45,
                    itemId: 'endBtn',
                    style: 'font-size: 16px; padding-top: 15px; border: 1px solid #eee;',
                    ui: 'plain',
                    width: 130,
                    iconAlign: 'right',
                    iconCls: 'calendar-img',
                    text: 'mm/dd/yyyy',
                    listeners: {
                        click: 'onEndBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'resetBtn',
                    style: 'margin-right: 20px; margin-left: -10px;',
                    ui: 'plain',
                    width: 30,
                    iconCls: 'fa-icon-remove',
                    listeners: {
                        click: 'onResetBtnClick'
                    }
                },
                {
                    xtype: 'button',
                    reference: 'findBtn',
                    cls: 'find-btn',
                    height: 45,
                    itemId: 'findBtn',
                    style: 'font-size: 16px; padding-top: 15px; border: 1px solid #eee;',
                    ui: 'plain',
                    width: 65,
                    text: 'Find',
                    listeners: {
                        click: 'onFindBtnClick'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            region: 'center'
        }
    ],

    initComponent: function() {
        var me = this;

        me.callParent(arguments);

    }

});