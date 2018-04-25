using IMS.IdeaPool.Data.Interfaces;
using IMS.IdeaPool.DataObjects;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Entity;
using System.Linq;

namespace IMS.IdeaPool.Data
{
    internal class SettingsData : ISettingsData
    {
        public SettingsGroupDataObject GetGroupSettings(string key)
        {
            SettingsGroupDataObject settingsGroup = null;
            using (var context = new IdeaPoolEntities())
            {
                SettingsGroup group = context.SettingsGroups
                    .Where(x => x.Key == key)
                    .Include(x => x.Settings)
                    .SingleOrDefault();

                settingsGroup = Map(group);
            }
            return settingsGroup;
        }

        public List<SettingsGroupDataObject> GetGroupSettings()
        {
            using (var context = new IdeaPoolEntities())
            {
                List<SettingsGroup> groups = context.SettingsGroups
                    .Include(x => x.Settings)
                    .ToList();

                return groups
                    .Select(group => Map(group))
                    .ToList();
            }
        }

        public T GetValue<T>(string key)
        {
            T value = default(T);
            using (var context = new IdeaPoolEntities())
            {
                try
                {
                    Setting setting = context.Settings.Where(x => x.Key == key).SingleOrDefault();
                    if (setting != null)
                    {
                        var converter = TypeDescriptor.GetConverter(typeof(T));
                        if (converter != null)
                        {
                            value = (T)converter.ConvertFromString(setting.Value);
                        }
                    }
                }
                catch { }
            }
            return value;
        }

        public List<string> Update(SettingsGroupDataObject group)
        {
            List<string> keys = new List<string>();
            using (var context = new IdeaPoolEntities())
            {
                List<Setting> settings = context
                    .SettingsGroups
                    .Where(x => x.Key == group.Key)
                    .Include(x => x.Settings)
                    .SelectMany(x => x.Settings)
                    .ToList();
                foreach(var setting in settings)
                {
                    SettingsDataObject obj = group.Settings.SingleOrDefault(x => x.Key == setting.Key);
                    if (obj != null && setting.Value != obj.Value)
                    {
                        setting.Value = obj.Value;                        
                        context.Entry(setting).State = EntityState.Modified;
                        keys.Add(setting.Key);
                    }
                }
                context.SaveChanges();
            }
            return keys;
        }

        private SettingsGroupDataObject Map(SettingsGroup group)
        {
            SettingsGroupDataObject settingsGroup = null;
            if (group != null)
            {
                settingsGroup = new SettingsGroupDataObject
                {
                    Id = group.Id,
                    Key = group.Key,
                    Name = group.Name,
                    Settings = group.Settings.Select(x => new SettingsDataObject
                    {
                        Id = x.Id,
                        Key = x.Key,
                        Description = x.Description,
                        Value = x.Value,
                        Limit = x.Limit,
                        Type = x.Type
                    }).ToList()
                };
            }
            return settingsGroup;
        }
    }
}
