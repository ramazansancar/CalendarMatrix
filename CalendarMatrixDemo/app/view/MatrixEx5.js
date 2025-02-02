/*
 * File: app/view/MatrixEx5.js
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

Ext.define('CalendarMatrix.view.MatrixEx5', {
    extend: 'Ext.container.Container',
    alias: 'widget.matrixex5',

    requires: [
        'CalendarMatrix.view.MatrixEx5ViewModel',
        'CalendarMatrix.view.MatrixEx5ViewController',
        'Ext.container.Container',
        'Ext.button.Button'
    ],

    controller: 'matrixex5',
    viewModel: {
        type: 'matrixex5'
    },
    cls: 'matrix-ex5-cal',
    itemId: 'matrixEx5',
    margin: 5,
    style: 'background-color: white;',
    layout: 'border',

    items: [
        {
            xtype: 'container',
            region: 'north',
            html: 'Trivago style date range selector. Also demonstrates the following:<br>  - Customized month navigation arrows and utilizes renderTplOverride config to display weekday names to 3 characters.<br>  - Utilizes initRangeDts config to default startDate/endDate.  Custom styling of startDate and endDate relies on injected .startdate and .enddate CSS selectors<br>  - Utilizes customClsFn config to inject custom unique CSS selectors for Saturday vs. Sunday<br>  - Utilizes disableFn config to dynamically disable dates based on startDate vs. endDate selection mode.',
            style: 'margin: 20px 0; font-size: 18px;'
        },
        {
            xtype: 'container',
            region: 'north',
            reference: 'slidingCalendar',
            height: 350,
            itemId: 'slidingCalendar',
            items: [
                {
                    xtype: 'container',
                    height: '50px',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            listeners: {
                                render: function(panel) {
                               panel.el.on('click', function(e) {
                                  var me = this.component.up('#matrixEx5');
                                  me.getController().checkInBtnClick(this.component);
                               });
                             }
                            },
                            reference: 'checkInBtn2',
                            cls: [
                                'check-in-btn2',
                                'selected'
                            ],
                            height: 40,
                            itemId: 'checkInBtn2',
                            width: 156,
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'check-in-btn2-label',
                                    html: 'Check-in'
                                },
                                {
                                    xtype: 'container',
                                    reference: 'checkInBtn2Date',
                                    cls: 'check-in-btn2-date',
                                    html: 'date',
                                    itemId: 'checkInBtn2Date'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            listeners: {
                                render: function(panel) {
                               panel.el.on('click', function(e) {
                                  var me = this.component.up('#matrixEx5');
                                  me.getController().checkOutBtnClick(this.component);
                               });
                             }
                            },
                            reference: 'checkOutBtn2',
                            cls: 'check-out-btn2',
                            height: 40,
                            itemId: 'checkOuttBtn2',
                            width: 156,
                            items: [
                                {
                                    xtype: 'container',
                                    cls: 'check-in-btn2-label',
                                    html: 'Check-out'
                                },
                                {
                                    xtype: 'container',
                                    reference: 'checkOutBtn2Date',
                                    cls: 'check-in-btn2-date',
                                    html: 'date',
                                    itemId: 'checkOutBtn2Date'
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            height: 30,
                            itemId: 'resetBtn',
                            style: 'padding: 0px 5px 5px 5px;',
                            ui: 'plain',
                            width: 30,
                            iconCls: 'fa-icon-remove',
                            listeners: {
                                click: 'onResetBtnClick'
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1
                        }
                    ]
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

        var slidingCalendar, cal, priorBtn, nextBtn, toolbar, renderTplOverride;

        renderTplOverride = [  // Overriding default renderTpl (refer to Ext.picker.Date) to include 3-chars in weekday names... see firstInitial() template method
            '<div id="{id}-innerEl" data-ref="innerEl">',
            '<div class="{baseCls}-header">',
            '<div id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-prev {baseCls}-arrow" role="button" title="{prevText}"></div>',
            '<div id="{id}-middleBtnEl" data-ref="middleBtnEl" class="{baseCls}-month" role="heading">{%this.renderMonthBtn(values, out)%}</div>',
            '<div id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-next {baseCls}-arrow" role="button" title="{nextText}"></div>',
            '</div>',
            '<table role="grid" id="{id}-eventEl" data-ref="eventEl" class="{baseCls}-inner" {%',
            // If the DatePicker is focusable, make its eventEl tabbable.
            // Note that we're looking at the `focusable` property because
            // calling `isFocusable()` will always return false at that point
            // as the picker is not yet rendered.
            'if (values.$comp.focusable) {out.push("tabindex=\\\"0\\\"");}',
            '%} cellspacing="0">',
            '<thead><tr role="row">',
            '<tpl for="dayNames">',
            '<th role="columnheader" class="{parent.baseCls}-column-header" aria-label="{.}">',
            '<div role="presentation" class="{parent.baseCls}-column-header-inner">{.:this.firstInitial}</div>',
            '</th>',
            '</tpl>',
            '</tr></thead>',
            '<tbody><tr role="row">',
            '<tpl for="days">',
            '{#:this.isEndOfWeek}',
            '<td role="gridcell">',
            '<div hidefocus="on" class="{parent.baseCls}-date"></div>',
            '</td>',
            '</tpl>',
            '</tr></tbody>',
            '</table>',
            '<tpl if="showToday">',
            '<div id="{id}-footerEl" data-ref="footerEl" role="presentation" class="{baseCls}-footer">{%this.renderTodayBtn(values, out)%}</div>',
            '</tpl>',
            '</div>',
            {
                firstInitial: function(value) {
                    return value.substr(0, 3).toUpperCase();  // Overridden for this example to show 3 characters for day of week
                },
                isEndOfWeek: function(value) {
                    // convert from 1 based index to 0 based
                    // by decrementing value once.
                    value--;
                    var end = value % 7 === 0 && value !== 0;
                    return end ? '</tr><tr role="row">' : '';
                },
                renderTodayBtn: function(values, out) {
                    Ext.DomHelper.generateMarkup(values.$comp.todayBtn.getRenderTree(), out);
                },
                renderMonthBtn: function(values, out) {
                    Ext.DomHelper.generateMarkup(values.$comp.monthBtn.getRenderTree(), out);
                }
            }
        ];

        var today= Ext.Date.clearTime(new Date(Date(Ext.Date.now())), true);
        var todayDt = Ext.Date.format(today, "Y-m-d");
        var tomorrow = Ext.Date.add(today, Ext.Date.DAY, 1);
        var tomorrowDt = Ext.Date.format(tomorrow, "Y-m-d");

        cal = Ext.create('Ext.ux.CalendarMatrix.CalendarMatrix', {
            numRows: 1,
            numCols: 2,
            matrixMode: 'RANGE',
            initRangeDts: [todayDt, tomorrowDt],
            rangeSelectMode: 'startdate',
            matrixDisabled: false,
            renderTplOverride: renderTplOverride,
            cls: 'matrix-cal',
            itemId: 'matrixEx5Cal',
            reference: 'matrixEx5Cal',
            customClsFn: function(cellDate){ // Special styling for weekend days
                var customCls = '';
                var weekIdx = parseInt(Ext.Date.format(cellDate, 'w'));
                if ([0,6].indexOf(weekIdx) !== -1) {
                    customCls = 'weekend ' + (weekIdx===0 ? 'weekend0' : 'weekend6');
                }
                return customCls;
            },
            disableFn: function(cellDate, matrixCont){
                // When selecting enddates, disable dates prior to start date.  when selecting start dates, disable prior to today
                var today= Ext.Date.clearTime(new Date(Date(Ext.Date.now())), true);
                return (cellDate < (matrixCont.getRangeSelectMode()==='startdate' ? today : matrixCont.rangeDate1));
            }

        });

        var ctrl = me.getController();
        cal.mon(cal, 'calendarselect', ctrl.handleSelect, ctrl);

        // Use Controller methods to update button text based on defaulted start/end dates
        ctrl.updCheckInDate(today);
        ctrl.updCheckOutDate(tomorrow);


        toolbar = cal.down('#calGridToolBar');
        cal.remove(toolbar, true);

        priorBtn = Ext.create('Ext.button.Button',{
            ui: 'plain',
            iconCls: 'cal-grid-prior-btn',
            text: '',
            style: 'z-index: 200; position: absolute;',
            x: 5,
            y: 3,
            itemId: 'priorCalGridMatrix',
            reference: 'priorCalGridMatrix',
            listeners: {
                click: 'onPriorCalGridMatrixClick'
            }
        });

        cal.add(priorBtn);

        nextBtn = Ext.create('Ext.button.Button',{
            ui: 'plain',
            iconCls: 'cal-grid-next-btn',
            text: '',
            style: 'z-index: 200; position: absolute; ',
            x: 570,
            y: 3,
            itemId: 'nextCalGridMatrix',
            reference: 'nextCalGridMatrix',
            cls: 'cal-grid-next-btn',
            listeners: {
                click: 'onNextCalGridMatrixClick'
            }
        });

        cal.add(nextBtn);

        slidingCalendar = me.down('#slidingCalendar');
        slidingCalendar.add(cal);

    }

});